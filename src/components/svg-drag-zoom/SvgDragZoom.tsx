import React from 'react';
import 'd3/d3';
import 'snapsvg-cjs';
import './svg-drag-zoom.scss';

import {Loading} from '@/components/loading';

const d3 = window['d3'];

export interface SvgDragZoomProps {
    noPicPath?: string;
}

export class SvgDragZoom<T extends SvgDragZoomProps> extends React.Component<T> {

    state = {
        isShowLoading: false
    };

    protected svgId: string = 'svg-' + Date.now();

    // 旋转角度
    public degree: number = 0;

    // 默认图片路径
    private noPicPath: string = '';

    // 请求svg ajax XHR 对象
    private xhr: any;

    // svg 主对象
    public svg: any;

    // 图例视图对象
    public viewport: any;

    // 放大比例对象
    public zoomScale: any;

    // 图放大与缩小的比例步长
    private step: number = 0.2;

    // 工具栏容器
    public legendToolbarRef;

    // svg图例容器
    public legendBodyRef;

    // loading 对象
    protected loading = null;

    protected Snap = window['Snap'];

    constructor(props) {
        super(props);

        this.legendToolbarRef = React.createRef();
        this.legendBodyRef = React.createRef();
    }

    componentDidMount(): void {
    }

    // 提供url加载svg图
    public loadSVG(url) {
        const self = this;

        self.beforeLoad();

        self.xhr = d3.text(url, function (error, xmlStr) {
            if (error === null && self.isSVG(xmlStr)) {
                self.finishLoaded(xmlStr);
            } else { // 加载svg图失败，显示默认图
                self.loadDefaultImg();
            }

            // 加载完成后
            self.completeLoad();
        });
    }

    // 加载svg之前
    protected beforeLoad() {
        this.showLoading();
        this.removeDefaultImg();
        this.removeSvgTag();
    }

    // 完成加载，加载后成功或失败都调用此方法
    protected completeLoad() {
        this.xhr = null;
        this.hideLoading();
    }

    // 成功加载svg (构建svg、添加工具栏事件、添加svg图事件)。
    public finishLoaded(xmlStr) {
        this.buildSVG(xmlStr);
        this.addToolsEvents();
        this.addSvgEvents();
        this.resetTSR(this.viewport);
    }

    // 拿到svg xml, 构建svg
    private buildSVG(xmlStr) {
        const svgTagStr = xmlStr.match(/<svg[^>]*>/i)[0].replace('<svg', `<svg id="${this.svgId}"`);
        const svgTagInnerContent = xmlStr.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
        const newXmlStr = svgTagStr + '<g>' + svgTagInnerContent[1] + ' </g> </svg>';

        d3.select(this.legendBodyRef.current).html(newXmlStr);
        this.svg = d3.select('svg#' + this.svgId);
        this.svg.attr('width', '100%');
        this.svg.attr('height', '100%');
        this.viewport = this.svg.select('g');

        this.disableLegendToolbar(false);
    }

    // 工具栏添加事件(放大、缩小、还原、左旋转、右旋转)
    private addToolsEvents() {
        const self = this;
        const buttons = d3.select(this.legendToolbarRef.current).selectAll('[data-action]');

        buttons.on('click', function (a, idx, els) {
            const el = self.viewport;
            const action = buttons[0][idx].getAttribute('data-action');

            switch (action) {
                case 'zoomin':
                    self.zoomIn(el, self.step);
                    break;
                case 'zoomout':
                    self.zoomOut(el, self.step);
                    break;
                case 'reset':
                    self.resetTSR(el);
                    break;
                case 'leftrotate':
                    self.rotate(el, 0);
                    break;
                case 'rightrotate':
                    self.rotate(el, 1);
                    break;
                default:
                    break;
            }
        });
    }

    // 添加svg事件, 包括滚轮放大缩小与图平移事件
    private addSvgEvents() {
        const self = this;

        self.zoomScale = d3.behavior.zoom().scaleExtent([0.5, 10]);
        self.svg.call(self.zoomScale);

        self.zoomScale.on('zoom', function () {
            self.zoom(self.viewport);
        });
    }

    // svg图平移放大缩小的实现.
    private zoom(el) {
        const rotate = this.degree;
        const scale = this.zoomScale.scale();
        const translate = this.zoomScale.translate();

        this.setTSR(el, translate, scale, rotate);
    }

    // svg图放大
    private zoomIn(el, step) {
        if (this.zoomScale.scale() + step > 10) {
            return;
        }

        const degree = this.degree;
        const scale = this.zoomScale.scale() + step;
        const localMatrix = this.getLocalMatrix(el, scale, degree);

        this.zoomScale.scale(scale);
        this.zoomScale.translate([localMatrix.e, localMatrix.f]);
        this.zoom(el);
    }

    // svg图缩小
    private zoomOut(el, step) {
        if (this.zoomScale.scale() - step < 0.5) {
            return;
        }

        const degree = this.degree;
        const scale = this.zoomScale.scale() - step;
        const localMatrix = this.getLocalMatrix(el, scale, degree);

        this.zoomScale.scale(scale);
        this.zoomScale.translate([localMatrix.e, localMatrix.f]);
        this.zoom(el);
    }

    // svg获取本地矩阵
    private getLocalMatrix(el, scale, degree) {
        const bbox = el.node().getBBox();
        const translate = {
            cx: bbox.width / 2,
            cy: bbox.height / 2,
            dx: (bbox.width - bbox.width * scale) / 2,
            dy: (bbox.height - bbox.height * scale) / 2
        };

        const matrix = new this.Snap.Matrix(scale, 0, 0, scale, translate.dx, translate.dy);

        const localMatrix = matrix.rotate(degree, translate.cx, translate.cy);

        return localMatrix;
    }

    // svg图旋转
    public rotate(el, delta) {
        let degree = this.degree;
        const scale = this.zoomScale.scale();

        degree = (delta === 1 ? degree + 30 : degree - 30);

        const localMatrix = this.getLocalMatrix(el, scale, degree);

        this.setTSR(el, [localMatrix.e, localMatrix.f], scale, degree);
        this.zoomScale.translate([localMatrix.e, localMatrix.f]);
        this.degree = degree;
    }

    // svg图的transform设置
    private setTSR(el, translate, scale, rotate) {
        el.transition().duration(0).attr('transform', 'translate(' + translate + ')scale(' + scale + ')rotate(' + rotate + ')');
    }

    // 重置图并还原初始状态
    public resetTSR(el) {
        this.setTSR(el, [0, 0], 1, 0);
        this.zoomScale.scale(1);
        this.zoomScale.translate([0, 0]);
        this.degree = 0;
    }

    // 检测xml文件是否是标准svg
    private isSVG(xmlStr) {
        return xmlStr.match(/<svg[^>]*>/i) ? true : false;
    }

    // 终止ajax请求
    private abordXhr() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // 将图内元素移到图幅中间
    public setElToCenter(target) {
        const el = this.viewport;
        const svgNode = this.svg.node();
        const portMargin = this.getPortMargin(svgNode);
        const portCTM = el.node().getCTM();
        const targetCTM = target.getCTM();
        const scale = this.zoomScale.scale();
        const degree = this.degree;
        const mLeft = targetCTM.e - portCTM.e;
        const mTop = targetCTM.f - portCTM.f;
        const clientSize = svgNode.getBoundingClientRect();
        const translate = [
            ((clientSize.width / 2 - portMargin.left - mLeft) / portCTM.a) * scale, ((clientSize.height / 2 - portMargin.top - mTop) / portCTM.a) * scale
        ];

        this.setTSR(el, translate, scale, degree);
        this.zoomScale.translate(translate);
    }

    // 获取图元素的标距
    private getPortMargin(node) {
        let screenCTM;
        const $ = window['$'];

        if (node.getCTM()) {
            return {
                left: node.getCTM().e,
                top: node.getCTM().f
            };
        } else {
            screenCTM = node.getScreenCTM();
            return {
                left: screenCTM.e - $(node).offset().left,
                top: screenCTM.f - $(node).offset().top
            };
        }
    }

    // 移除svg标签
    private removeSvgTag() {
        d3.select(this.legendBodyRef.current).select('svg').remove();
    }

    // 获取当前图例放大比例
    public getScale() {
        return this.zoomScale.scale();
    }

    // 获取当前图例放转角度
    public getRotate() {
        return this.degree;
    }

    // 加载默认图
    public loadDefaultImg() {
        this.legendBodyRef.current.style.background = 'url(' + this.noPicPath + ') no-repeat center center';
        this.disableLegendToolbar(true);
    }

    // 移出默认加载图
    public removeDefaultImg() {
        this.legendBodyRef.current.style.background = 'none';
        this.disableLegendToolbar(true);
    }

    // 禁用或启用工具栏
    public disableLegendToolbar(disabled) {
        let buttons = d3.selection(this.legendToolbarRef.current).selectAll('[data-action]');

        if (disabled) {
            buttons.classed('disabled', true);
        } else {
            buttons.classed('disabled', false);
        }
    }

    public showLoading() {
        this.setState({
            isShowLoading: true
        });
    }

    public hideLoading() {
        this.setState({
            isShowLoading: false
        });
    }

    render() {
        return (
            <Loading isShow={this.state.isShowLoading}>
                <div className="legend-toolbar" ref={this.legendToolbarRef}>
                    <a data-action="zoomin" className="legend-toolbar-zoomin disabled"></a>
                    <a data-action="zoomout" className="legend-toolbar-zoomout disabled"></a>
                    <a data-action="reset" className="legend-toolbar-reset disabled"></a>
                    <a data-action="rightrotate" className="legend-toolbar-right-rotate disabled"></a>
                    <a data-action="leftrotate" className="legend-toolbar-left-rotate disabled"></a>
                </div>
                <div className="svg-wrap" ref={this.legendBodyRef}></div>
            </Loading>
        );
    }
}

import {SvgDragZoom, SvgDragZoomProps} from '@/components/svg-drag-zoom';

export interface SvgHotPointProps extends SvgDragZoomProps {
    onLegendLoaded: Function;
    onSelectCallout: Function;
}

export class SvgHotPoint extends SvgDragZoom<SvgHotPointProps> {

    // 图内序号类型, N:数字类型, S:字符类型
    private calloutType: string = 'N';

    // 提取数字类型callout正则表达式
    private calloutRegExpN: RegExp = /^\d{1,3}$/;

    // 提取字符类型callout正则表达式
    private calloutRegExpS: RegExp = /^\w{1,3}$/;

    // callout文本对象集
    private texts: any;

    // 重写父方法， 预存所有的callout 文本对象，
    // 标记callout原始角度，添加图例事件
    public finishLoaded(xmlStr) {
        super.finishLoaded(xmlStr);

        this.texts = this.getTexts();
        this.markCalloutOriginalPosition();
        this.addLegendEvents();
        this.hideLoading();
        this.props.onLegendLoaded();
    }

    // 获取所有的callout 文本对象
    private getTexts() {
        const self = this;
        const texts = self.svg.selectAll('text')
            .filter(function () {
                const callout = self.calloutTrim(this.textContent);

                if (self.calloutType === 'N') {
                    return self.calloutRegExpN.test(callout);
                } else {
                    return self.calloutRegExpS.test(callout);
                }
            });

        return texts;
    }

    // 标记callout原始坐标位置
    private markCalloutOriginalPosition() {
        const self = this;

        self.texts.each(function () {
            const item = self.Snap(this);
            const matrix = item.transform().localMatrix.toString();

            item.node.style.cursor = 'pointer';
            item.data('data-matrix', matrix);
            item.data('data-bbox', item.getBBox());
        });
    }

    // 添加图例事件(点击、触摸、鼠标移入、鼠标移出)
    private addLegendEvents() {
        const self = this;

        self.texts.on({
            'click': function () {
                self.selectCallout(this);
            },
            'touchstart': function () {
                self.selectCallout(this);
            },
            'mouseover': function (e) {
                self.calloutIn(this);
            },
            'mouseout': function (e) {
                self.calloutOut();
            }
        });
    }

    // 选中点击callout并高亮
    private selectCallout(target) {
        const callout = this.calloutTrim(target.textContent);
        const texts = this.getCalloutTexts([callout]);

        this.highlightCallout(texts);
        this.props.onSelectCallout(callout);
    }

    // 鼠标移入到callout并高亮
    private calloutIn(target) {
        const flag = 'temp';
        const stroke = '#FFDD02';

        this.appendCircle(target, stroke, flag);
    }

    // 鼠标移出callout并移除高亮
    private calloutOut() {
        const self = this;
        const flag = 'temp';

        self.removeCircle(flag);
    }

    // 高亮显示callout
    private highlightCallout(texts) {
        const self = this;
        const stroke = '#E30A0A';
        const flag = 'selected';

        self.removeCircle(flag);

        texts.each(function () {
            self.appendCircle(this, stroke, flag);
        });
    }

    // 根据callouts，获取所有callout文本对象
    private getCalloutTexts(callouts) {
        if (!this.texts) {
            return [];
        }

        const self = this;
        const texts = self.texts.filter(function () {
            const callout = self.calloutTrim(this.textContent);

            return callouts.indexOf(callout) > -1;
        });

        return texts;
    }

    // callout添加高亮圆圈
    private appendCircle(target, stroke, flag) {
        const self = this;
        const bbox = self.Snap(target).getBBox();
        const circle = self.createCircle(bbox.cx, bbox.cy, stroke, flag);

        self.viewport.node().appendChild(circle);
    }

    // 移除callout 高亮圆圈
    private removeCircle(flag) {
        const self = this;

        self.viewport.selectAll('circle[flag="' + flag + '"]').remove();
    }

    // 原生创建高亮圆圈
    private createCircle(cx, cy, stroke, flag) {
        const r = '18';
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        circle.setAttribute('flag', flag);
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('stroke-width', '3');
        circle.setAttribute('fill', 'none');

        return circle;
    }

    // callout 除去左右空格
    private calloutTrim(callout) {
        return callout.replace(/[ ]/g, '').replace(/[\r\n]/g, '');
    }

    // 激活批量高亮显示callout，并将callout移到可见区域
    public activeCallout(callouts) {
        const self = this;
        const texts = self.getCalloutTexts(callouts);

        if (texts.length && texts.length > 0) {
            self.highlightCallout(texts);
            self.calloutIntoView(texts);
        }
    }

    // 激活单个高亮显示callout，并将callout移到可见区域
    public activeSingleCallout(text) {
        const self = this;
        const texts = self.getCalloutTexts([text]);

        if (texts.length && texts.length > 0) {
            self.highlightCallout(texts);
            self.calloutIntoView(texts);
        }
    }

    // 将callout移到可见区域
    private calloutIntoView(texts) {
        const self = this;
        const isVisible = self.getCalloutVisible(texts);
        const scale = self.zoomScale.scale();
        const degree = self.degree;

        if (!isVisible) {
            if (texts.length > 1 || scale === 1 || degree !== 0) {
                self.resetTSR(self.viewport);
                self.resetCalloutDegree();
            } else {
                self.calloutMoveCenter(texts.node());
            }
        }
    }

    // 将callout移到中心区域
    private calloutMoveCenter(item) {
        const self = this;

        self.setElToCenter(item);
    }

    // 获取callout是否在可见区域
    private getCalloutVisible(texts) {
        const self = this;
        let isVisible = true;
        const clientSize = self.svg.node().getBoundingClientRect();
        const scale = self.zoomScale.scale();
        const minLeft = (scale * 10) / 2;
        const minTop = (scale * 10) / 2;
        const maxLeftRange = clientSize.width - (10 * scale) / 2;
        const maxTopRange = clientSize.height - (10 * scale) / 2;

        texts.each(function () {
            const itemSize = self.getNodeSize(this);
            if ((itemSize.x < minLeft || itemSize.y < minTop) || (itemSize.x > maxLeftRange || itemSize.y > maxTopRange)) {
                isVisible = false;
                return false;
            }
        });

        return isVisible;
    }

    // 获取节点规则大小参数
    private getNodeSize(node) {
        const self = this;
        const bbox = node.getBBox();
        const ctm = node.getCTM();
        const nodeClientRect = node.getBoundingClientRect();
        const svgClientRect = self.svg.node().getBoundingClientRect();

        return {
            x: nodeClientRect.left - svgClientRect.left,
            y: nodeClientRect.top - svgClientRect.top,
            width: bbox.width,
            height: bbox.height,
            scale: ctm.a
        };
    }

    // 重写父方法， 旋转保证callout正向显示
    public rotate(el, delta) {
        super.rotate(el, delta);
        this.setCalloutDegree(this.degree);
    }

    // 重置图例并重置callout显示角度
    public resetTSR(el) {
        super.resetTSR(el);
        this.resetCalloutDegree();
    }

    // 重置callout角度
    private resetCalloutDegree() {
        const self = this;

        if (!self.texts) {
            return;
        }

        self.texts.each(function () {
            const item = self.Snap(this);
            const matrix = item.data('data-matrix');

            item.animate({
                x: 0,
                y: 0
            }, 0);
            item.animate({
                transform: matrix
            }, 0);
        });
    }

    // 设置callout角度
    private setCalloutDegree(degree) {
        const self = this;

        self.texts.each(function () {
            const item = self.Snap(this);
            const bbox = item.data('data-bbox');
            item.animate({
                x: parseInt(bbox.x),
                y: parseInt(bbox.y + 12)
            }, 0);
            item.animate({
                transform: 'r' + (degree > 0 ? -degree : Math.abs(degree)) + ', ' + bbox.cx + ', ' + bbox.cy
            }, 0);
        });
    }

    // 重写父类加载默认图，重置texts
    public loadDefaultImg() {
        const self = this;

        super.loadDefaultImg();
        self.texts = null;
    }
}

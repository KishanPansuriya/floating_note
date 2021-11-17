import { LightningElement, track } from 'lwc';

export default class DemoIqviaLwc extends LightningElement {
    
    @track panel;
    @track m_pos;
    @track isComponentCollapsed = false;

    resize = (e) => {        
        console.log('resizing');
        const dx = this.m_pos - e.x;
        this.m_pos = e.x;
        let new_width = (parseInt(getComputedStyle(this.panel, '').width) + dx);
        console.log(new_width);
        if (new_width < 550){
            this.panel.style.setProperty('width', new_width + "px");
        }
        if(new_width < 30){
            this.isComponentCollapsed = true;
        }
        if(new_width > 30){
            this.isComponentCollapsed = false;
        }
    }

    renderedCallback() {
        this.panel = this.template.querySelector('.right_panel');        
        this.panel.addEventListener("mousedown", (e) => {
            console.log('listening mousedown.');
            const BORDER_SIZE = 4;
            if (e.offsetX < BORDER_SIZE) {
                this.m_pos = e.x;
                document.addEventListener("mousemove", this.resize, true);
            }
        }, true);

        document.addEventListener("mouseup", (e) => { 
            console.log('listening mouseup.');         
            document.removeEventListener("mousemove", this.resize, true);
        }, true);
    }

    handleCollapse(){
        console.log('inside handleCollapse.');
        this.panel.style.setProperty('width', 18 + "px");
        this.isComponentCollapsed = true;
    }

    handleExpand(){
        console.log('inside handleExpand.');
        this.panel.style.setProperty('width', 300 + "px");
        this.isComponentCollapsed = false;
    }

}
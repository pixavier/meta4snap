
// Inspirado en:  http://jsbin.com/quhujowota/1/edit?html,js,output

class Gauge extends HTMLElement {

  constructor() {
    super();
    this._value = 0;   // Value
    this._valueMax = 200;
    this._uds = '';
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._value = parseInt(this.getAttribute("value"));     	
    this._valueMax = parseInt(this.getAttribute("max"));
	let uds = this.getAttribute("uds");
    this._uds = uds ? uds : '';
    this.render();
  }
  
  get value() {
    return this._value;
  }
  
  set value(value) {
    this._value = value;
    this.render();
  } 

  get uds() {
    return this._uds;
  }
  
  set uds(value) {
    this._uds = value;
    this.render();
  } 
  
  render() {
    let cx = 100;
    let cy = 100;
    let angle = this.value * 180/this._valueMax - 90;
    let pathArc0 = this.describeArc(100, 100, 60, -90, -90);
    let pathArc1 = this.describeArc(100, 100, 60, -90, 90);
    let pathArc2 = this.describeArc(100, 100, 60, -90, angle);
    let xText;
	if (this.value >= 10000) xText = 65;
	else if (this.value >= 1000) xText = 75;
	else if (this.value >= 100) xText = 80;
	else if (this.value >= 10) xText = 88;
	else if (this.value < 10) xText = 92;
    let html = `
    <svg id="gauge" width="200" height="100%" viewBox="0 0 200 100">
    	<path d = '${pathArc1}' fill='none' stroke='#FDE47F' stroke-width='30' />
        <path d = '${pathArc2}' fill='none' stroke='orange' stroke-width='30' />
    	<text x="${xText}" y="95" style="font-family:Arial;font-size:22;font-weight:bold;fill:black">
        ${this.value}</text>
    	<text x="120" y="20" style="font-family:Arial;font-size:22;font-weight:bold;fill:black">
        ${this.uds}</text>
    </svg>
    `;
    this.shadowRoot.innerHTML = html;
  }

  describeArc(x, y, radius, startAngle, endAngle){
    let start = this.polarToCartesian(x, y, radius, endAngle);
    let end = this.polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    let d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
    return d;   	
  }
  
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}

customElements.define('wg-gauge', Gauge);

export {Gauge};


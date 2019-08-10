
import React,{PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {PLACEMENTS} from './constants'

// pure component is used to avoid rerendering
class TooltipPopover extends PureComponent{
constructor(props)
  {
  	super(props); 
    // initial state for tooltip popover
    this.state = {
            show: false,
            x : 0,
            y : 0
        };

  //  set refs for tooltipPopover
    this.tooltipPopover = React.createRef();
  }

// change TooltipPopover state on the basis of prop
static getDerivedStateFromProps(props,state){
  if (props.showPopover !== state.show) {
      return {
       show: props.showPopover
      };
    }
 return null;
}

// componentDidUpdate will run setPopoverPosition as a callback after the component is updated
componentDidUpdate(prevProps, prevState) {
  if (prevState.show !== this.state.show || (prevProps.targetPosition!==this.props.targetPosition)){
    if(this.state.show){
      // targetPosition prop is the boundary box of the target element. 
        this.setState((prevState)=>({...prevState,show: true}),this.setPopoverPosition(this.props.targetPosition));
    }
    else{
      this.setState((prevState)=>({...prevState,show: false}));
    }
      
  }
}


// this function is called as callback after the setstate.Once the tooltip popover is rendered then only calculation can be made for left top position attribute.
setPopoverPosition = ({x,y,height,width})=>()=>{
  let rx = x + width, // most right x of target element
      lx = x, // most left x of target element
      ty = y, // most top y of target element
      by = y + height; // most bottom y of target element
  let tooltipPopoverNode = this.tooltipPopover.current;

  // tpRect is the position attribute of tooltip popover
  let tpRect = tooltipPopoverNode.getBoundingClientRect();
  if(tpRect){
    // calculation for x,y of TooltipPopover on the basis of placement props defined 
    let placement = this.props.placement;
    if(placement==="top"){
        x = x + width/2 - tpRect.width/2;
        y = y - tpRect.height;
    }
    if(placement==="left"){
        x = x - tpRect.width;
        y = y + height/2-tpRect.height/2;
    }
    if(placement==="bottom"){
      x = x + width/2 - tpRect.width/2;
      y = y + height;
    }
    if(placement==="right"){
      x = x + width;
      y = y + height/2-tpRect.height/2;
    }
    // state is set again to rerender with new style 
    this.setState((prevState)=>({...prevState,x,y}));

  }

}

render(){
  
  let {show,x,y} = this.state;
  let {placement,children,showPopover,targetPosition} = this.props;
let visibility = show ? "show" : "hide";

return (
  
  <div ref={this.tooltipPopover} id="tooltip" style={{left:x,top:y}} className={visibility + " " + placement} >
  <div className="tooltip-arrow"></div>
  <div className="tooltip-content">{children}</div>
  </div>
);
}};


// proptypes of TooltipPopover component
TooltipPopover.propTypes = {
  placement : PropTypes.oneOf(PLACEMENTS),
  children : PropTypes.string,
  showPopover : PropTypes.bool.isRequired,
  targetPosition : PropTypes.object.isRequired,
}


export default TooltipPopover;
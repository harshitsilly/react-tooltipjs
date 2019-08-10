import React,{PureComponent} from 'react';
import TooltipPopover from './TooltipPopover';
import PropTypes from 'prop-types';
import {PLACEMENTS,TRIGGER} from './constants'
import './style.css';

class Tooltip extends PureComponent{
constructor(props)
  {
  	super(props);


    this.state = {showPopover:false,targetPosition : {}};
   
    // refs created for targetControl and tooltipComponent
    this.targetControl = React.createRef();
    this.tooltipComponent = React.createRef();
  }
  
componentDidMount(){
  this.setBoundaryBox();
  //  attach resize event listner so the boundary box of target gets updated when the window screen resizes.
  window.addEventListener("resize",this.setBoundaryBox,false); 
   document.addEventListener("scroll",this.setBoundaryBox,false);
  if(this.props.trigger==="click"){
  //  attach click event listner when trigger is click
  document.addEventListener("click",this.handleOutsideClick,false); 
  
  }
 
}
// helper function to set targetPosition state
setBoundaryBox = ()=>{

this.setState({...this.state,targetPosition : this.targetControl.current.getBoundingClientRect()});
}
componentWillUnmount() {
   if(this.props.trigger==="click"){
    //  remove click event listener on unmount
 document.removeEventListener("click",this.handleOutsideClick,false);
  }
   document.removeEventListener("scroll",this.setBoundaryBox,false);
  window.removeEventListener("resize",this.setBoundaryBox,false); 
}
 
// checks whether the click event is outside the tooltip in case of click trigger and closes the tooltip subsequently.
handleOutsideClick =(e)=>{

  if(this.tooltipComponent.current.contains(e.target)){
    return;
  } 
  
  this.onHideTooltip();
}

// function is called either on hover or on click of target element
onShowTooltip = (event)=>{
 if(!this.state.showPopover){
    this.setState({...this.state,showPopover:true});
 }
 
}

// function is called either on hoveroff or on outside click of target element
onHideTooltip = ()=>{
  if(this.state.showPopover){
    this.setState({...this.state,showPopover:false});
  }

}


render(){
  let {content,target,trigger,placement} = this.props;

  // target element is clone to add ref and browser events
  
  const referenceComponent = this.referenceComponent ? this.referenceComponent : React.cloneElement(target, trigger === "click" ? {
            onClick: this.onShowTooltip,
            ref: this.targetControl,

        }: {onMouseOver: this.onShowTooltip,
        onMouseOut:this.onHideTooltip,ref: this.targetControl});
 

  return <div ref={this.tooltipComponent} className="tooltipComponent">
      <TooltipPopover showPopover={this.state.showPopover} targetPosition ={this.state.targetPosition} placement={placement} >
        {content}
        </TooltipPopover >
  {referenceComponent}</div>;
}
}

// proptypes of tooltip component
Tooltip.propTypes = {
    content: PropTypes.string,
    target: PropTypes.element.isRequired,
    placement : PropTypes.oneOf(PLACEMENTS),
    trigger : PropTypes.oneOf(TRIGGER),
};

// default proptypes 
Tooltip.defaultProps = {
    placement: "right",
    trigger: "hover"
};

// proptypes description 
Tooltip.propDescriptions = {
   content: "Node content to render in the overlay",
    target: "Node to render as the reference element",
    placement : "Initial position of the `content` related to the `target",
    trigger : "Event on which tooltip will trigger",
};


export default Tooltip;

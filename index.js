//Replace reacts createElement function with my own implementation

// const element = React.createElement(
//     "div",   //This is the type
//     { id: "foo" },   //This is the props
//     React.createElement("a", null, "bar"),
//     React.createElement("b")     //These are  the children
//   )

//The function will return an object.
//type: The type of element the user wishes to create
//props: This includes identifiers of the type such as id, classname etc. We will be getting them as objects and they will be spread  
//      alongside with the list of children
//children: These are the children of the element. They must be of the type object. These are included in the props object
const createElement=(type,props,...children)=>{
    return (
        {
            type,
            props:{
                ...props,
                children
            }
        }
    )
}

//Primitive datatypes cannot be stored as children directly ( this is something the virtual DOM does to maintain the uniformity which makes 
// it so that we can avoid unnecessary checks in case we encounter a non object ).So for datatypes such strings and nums will be stored as text
const createText=(text)=>{
    return (
        {
            type:"TEXT",
            props:{
                nodeValue:text,
                children:[]
            }
        }
    )
}

// Creating a namespace similar to react: Didacts

const Didact={
    createElement,
    render,
    createText
    
}



//This function is used to add elements to the container. 
//Params: element,container
//we take in the element and create a DOM object from it. We add the elements props (non-children) to the DOM, and recursively
//add the children to DOM 
const render =(element,container)=>{
    const Dom= element.type==="TEXT"?
    Didact.createText(element.props.nodeValue):
    Didact.createElement(element.type);

    const isProperty=key=>key!=="children";

    Object.keys(element.props).filter(isProperty).forEach((prop)=>{
        Dom[prop]=element["props"][prop];

    })

    element.props.children.forEach((child)=>{
        render(child,Dom);
    })
    container.appendChild(Dom);
}

/** @jsx Didact.createElement */
const element = (
    <div style="background: salmon">
      <h1>Hello World</h1>
      <h2 style="text-align:right">from Didact</h2>
    </div>
  );
  const container = document.getElementById("root");
  Didact.render(element, container);
  
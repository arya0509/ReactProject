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
    
}
/** @jsx Didact.createElement */
const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
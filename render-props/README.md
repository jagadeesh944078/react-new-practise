- render prop pattern is a pattern in which a prop in a component which is a function and that returns a JSX
- render prop pattern is a pattern of react where particular prop in a component here prop itself is a fucntion that returns the jsx

- when to use render prpops

1. when we want to make component customizable
2. provide the ability to theme the component according to their design system

- therse is a component suppose iam passing icon as props and consider the scenerio where the usecase comes the designer wants another icon on another page
- so your component should be customizable to support any type of icon that developer passing in int0

- consider that scenerio where your creating component that just renderers heading so component should be customizable enough so that i can pass my own design system

- consider scenerio in companies they have their own design system such that materialUi and chakra UI etc.
- suppose if you create the component in company that can actually display the title and you want to use that component across multiple pages and first page you want to render in italic and second page you want it in bold

- so all these scenerios your component should be customizable so that it is very for developers to customize the things

- so here you are just rendering jsx in that particular component so its upto the developer which kind of jsx they want to pass it

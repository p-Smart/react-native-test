import { inspect } from 'util';


const log = (...args: any[]) => {
  const formattedArgs = args.map(arg => inspect(arg, { depth: Infinity, colors: true }));
  
  console.log(...formattedArgs);
};


export default log
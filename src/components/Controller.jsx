const Controller = ({countOnclick}) => {

    return (
        <div>
            <button onClick={() =>{countOnclick(-100);}}>-100</button>
            <button onClick={() =>{countOnclick(-10);}}>-10</button>
            <button onClick={() =>{countOnclick(-1);}}>-1</button>
            <button onClick={() =>{countOnclick(1);}}>1</button>
            <button onClick={() =>{countOnclick(10);}}>10</button>
            <button onClick={() =>{countOnclick(100);}}>100</button>
        </div>
    );
}

export default Controller;

// const Controller = ({countOnclick}) => {
//     return (
//         <div>
//             <button 
//                 onClick={() =>{
//                     countOnclick(-100);
//                 }}
//             >-100</button>
//             <button>-10</button>
//             <button>-1</button>
//             <button>1</button>
//             <button>10</button>
//             <button
//             onClick={() =>{
//                 countOnclick(100);}
//             }>100</button>
//         </div>
//     );
// }

// export default Controller;
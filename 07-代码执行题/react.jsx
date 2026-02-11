/* 
 *
 * 说一说程序的执行过程，并写出程序中console.log打印出的内容
 */
debugger;
const Logger = (function (){
    let _logMsg = '';
    console.log('x'); 
    return (msg) => msg ? _logMsg=`${_logMsg}${msg}` : _logMsg;
})();

const Test = () => {
  const [count, setCount] = useState(0);
  Logger('a');

  useEffect(() => {
    Logger('b');

    const i = setInterval(() => {
      setCount(count + 1);
     
      if (count<3){ 
        Logger(count);
      }
    }, 1000);
    
    return ()=>{
      console.log('r'); 
      clearInterval(i);
    }
  }, []);

  Logger('c');

  console.log(Logger()); 

  return <span>{`${count}`}</span>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

Logger('d');

// 渲染函数式异步的
root.render(<Test />);

Logger('e');

// console.log的输出内容为：x deac deacb0ac
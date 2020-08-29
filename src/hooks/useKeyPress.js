
import {useEffect, useRef, useState} from 'react';

const useKeyPress =(targetKeyCode)=>{
    const [keyPressed,setKeyPressed] = useState(false);

    const keyDownHandler = ({keyCode})=>{
        if(keyCode === targetKeyCode){
            setKeyPressed(true)
        }
    }

    const keyUpHandler = ({keyCode})=>{
        if(keyCode === targetKeyCode){
            setKeyPressed(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown',keyDownHandler)
        document.addEventListener('keyup',keyUpHandler)
        //清除副作用
        return ()=>{
            document.removeEventListener('keydown',keyDownHandler)
            document.removeEventListener('keyup',keyUpHandler)
        }
        //这里传一个空数组，意思是加载的时候添加，卸载的时候卸载
    },[])

    return keyPressed;
}
export default useKeyPress;
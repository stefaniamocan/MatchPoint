import  { useEffect, useState } from "react";

export default () => {
    const [isSignedIn, setiSignedIn] = useState(false);

    const setSignedIn = async signTerm => {
        try{
            setiSignedIn(signTerm);

        } catch(err){
        alert('Something went wrong!');
        }
        console.log("isSignedIn dupa setSignedIN: ",isSignedIn);
    }
    const getSignedIn = async => {
        try{
            if(isSignedIn === true)
                console.log('The account is signed in');
            else 
            console.log('The account is signed OUT');

        } catch(err){
        alert('Something went wrong!');
        }
    }

    useEffect(() => {
        setSignedIn(false);
    }, []);

    return [setSignedIn, getSignedIn, isSignedIn];
};
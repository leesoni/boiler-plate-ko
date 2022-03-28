import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {

    // option의 종류
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(() => {

            dispatch(auth()).then(response => {

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        //props.history.push('/login')
                        navigate('/login')
                    }
                }else {
                    // 로그인 한 상태
                    if(option === false)
                        //props.history.push('/')
                        navigate('/')
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { changeInput, LoginThunk } from './login.slice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useTheme } from 'styled-components';
import { ILoginProps } from './login.interface';
import {
    ToggleWrapper,
    FacebookLoginButton,
    FacebookLoginButtonWrapper,
    ForgotPasswordWrapper,
    LoginButton,
    LoginButtonWrapper,
    LoginInputLabel,
    LoginInputWrap,
    LoginInputWrapper,
    LoginWrapper,
    OrWrapper,
    SignUpWrap,
    SignUpWrapper,
    ToggleWrap,
    ErrorWrapper,
} from './Login.style';

function Login({ onClickRegister }: ILoginProps) {
    const theme = useTheme();
    const { t } = useTranslation('login');
    const [showPw, setShowPw] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id, pw, isLogin, error } = useAppSelector((state) => ({
        id: state.login.id,
        pw: state.login.pw,
        error: state.login.error,
        isLogin: state.login.isLogin,
    }));

    const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInput({ key: 'id', value: e.currentTarget.value }));
    }, []);

    const onChangePw = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInput({ key: 'pw', value: e.currentTarget.value }));
    }, []);

    const onClickTogglePassword = useCallback(() => {
        setShowPw((s) => !s);
    }, []);

    const onSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            dispatch(
                LoginThunk({
                    id,
                    pw,
                })
            );
        },
        [id, pw]
    );

    const errorText = useMemo(() => {
        if (error === null) return '';
        else return t(error);
    }, [error]);

    const isEmptyId = useMemo(() => {
        return id.length === 0;
    }, [id]);

    const isEmptyPw = useMemo(() => {
        return pw.length === 0;
    }, [pw]);

    const isPossibleLogin = useMemo(() => {
        return id.length > 0 && pw.length >= 6;
    }, [id, pw]);

    useEffect(() => {
        if(isLogin) router.push('/home');
    }, [isLogin])

    return (
        <LoginWrapper>
            <form onSubmit={onSubmit}>
                <div className="top">
                    <FacebookLoginButtonWrapper>
                        <FacebookLoginButton
                            colors={theme.colors}
                            type="button"
                        >
                            <a href="">
                                <span />
                                {t('facebookLogin')}
                            </a>
                        </FacebookLoginButton>
                    </FacebookLoginButtonWrapper>
                    <OrWrapper colors={theme.colors}>
                        <div />
                        <div className="text">{t('or')}</div>
                        <div />
                    </OrWrapper>
                    <LoginInputWrapper>
                        <LoginInputWrap colors={theme.colors}>
                            <LoginInputLabel
                                colors={theme.colors}
                                isEmptyInput={isEmptyId}
                            >
                                <span>{t('placeholderAboutId')}</span>
                                <input
                                    aria-label={t('placeholderAboutId')}
                                    aria-required="true"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    maxLength={75}
                                    type="text"
                                    value={id}
                                    onChange={onChangeId}
                                />
                            </LoginInputLabel>
                            <ToggleWrapper />
                        </LoginInputWrap>
                    </LoginInputWrapper>
                    <LoginInputWrapper>
                        <LoginInputWrap colors={theme.colors}>
                            <LoginInputLabel
                                colors={theme.colors}
                                isEmptyInput={isEmptyPw}
                            >
                                <span>{t('placeholderAboutPw')}</span>
                                <input
                                    aria-label={t('placeholderAboutPw')}
                                    aria-required="true"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    maxLength={75}
                                    type={showPw === true ? 'text' : 'password'}
                                    value={pw}
                                    onChange={onChangePw}
                                />
                            </LoginInputLabel>
                            <ToggleWrapper>
                                <ToggleWrap
                                    colors={theme.colors}
                                    isEmpty={isEmptyPw}
                                >
                                    <button
                                        type="button"
                                        onClick={onClickTogglePassword}
                                    >
                                        {showPw === true
                                            ? t('hidePassword')
                                            : t('showPassword')}
                                    </button>
                                </ToggleWrap>
                            </ToggleWrapper>
                        </LoginInputWrap>
                    </LoginInputWrapper>
                    <ForgotPasswordWrapper colors={theme.colors}>
                        <a href="/accounts/password/reset/" tabIndex={0}>
                            <div className="text">{t('forgetPassword')}</div>
                        </a>
                    </ForgotPasswordWrapper>
                    <LoginButtonWrapper>
                        <LoginButton
                            type="submit"
                            colors={theme.colors}
                            isPossibleLogin={isPossibleLogin}
                        >
                            <div className="text">{t('logIn')}</div>
                        </LoginButton>
                    </LoginButtonWrapper>
                    <ErrorWrapper hide={error === null} colors={theme.colors}>
                        {errorText}
                    </ErrorWrapper>
                </div>
                <div className="bottom">
                    <SignUpWrapper
                        colors={theme.colors}
                        onClick={onClickRegister}
                    >
                        <p>
                            {t('signUpText')}
                            <SignUpWrap colors={theme.colors}>
                                {t('signUpButton')}
                            </SignUpWrap>
                        </p>
                    </SignUpWrapper>
                </div>
            </form>
        </LoginWrapper>
    );
}

export default Login;

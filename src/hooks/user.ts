import { useMutation, useQuery } from '@apollo/client';
import { LogInQuery, LogInRequestType, LogInResponseType, ViewerQuery, ViewerResponseType } from '../queries/user';
import { useEffect } from 'react';
import { deleteToken, getToken, setToken, useViewerStore } from '../store/user';
import { message } from 'antd';

export const useAutoLogin = () => {
  const [logIn] = useMutation<LogInResponseType, LogInRequestType>(LogInQuery);
  const { refetch: reLogin } = useQuery<ViewerResponseType>(ViewerQuery, { skip: true });
  const [messageApi, error] = message.useMessage();
  const { setSession, viewer } = useViewerStore();

  useEffect(() => {
    const callError = (message?: string) => {
      return messageApi.open({
        type: 'error',
        content: message ? message : 'Error during account login',
      });
    };

    const userLogin = async () => {
      try {
        const token = getToken();
        if (token) {
          const user = await reLogin();
          if (!user?.data?.viewer) {
            return callError();
          }
          setSession({
            viewer: user?.data?.viewer,
          });
          return;
        }
        const result = await logIn({
          variables: {
            username: import.meta.env.VITE_APP_BASE_AUTH_LOGIN,
            password: import.meta.env.VITE_APP_BASE_AUTH_PASSWORD,
          },
        });
        if (!result?.data?.logIn?.viewer) return callError();
        setToken(result?.data?.logIn?.viewer?.sessionToken);
        setSession({
          viewer: result?.data?.logIn?.viewer,
        });
      } catch (error) {
        if (error instanceof Error) callError(error.message);
        deleteToken();
      }
    };
    userLogin();
  }, []);

  return { error, viewer };
};

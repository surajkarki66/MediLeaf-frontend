import { useQuery } from 'react-query';

import { queries } from '@/lib/queries';
import { getApi, patchApi, postApi } from '@/lib/utils';

// ACCOUNTS
export const signup = async (payload: any) =>
  await postApi('/signup/', payload, { withCredentials: true }, false);

export const login = async (payload: any) =>
  await postApi('/login/', payload, { withCredentials: true }, false);

export const logout = async () =>
  await postApi('/logout/', '', { withCredentials: true });

export const forgotPassword = async (payload: any) =>
  await postApi('/forgot-password/', payload, { withCredentials: true }, false);

export const resetPassword = async (payload: any) =>
  await postApi(
    `/reset-password/${payload.uidb64}/${payload.token}/`,
    payload.values,
    { withCredentials: true }
  );

export const resetPasswordToken = async ({
  uidb64,
  token,
}: {
  uidb64: string;
  token: string;
}) =>
  await getApi(`/reset-password/${uidb64}/${token}/`, {
    withCredentials: true,
  });

export const getCsrfToken = async () =>
  getApi(`/csrf/`, {
    withCredentials: true,
  });

// PROFILE
export const getUserProfile = async () =>
  await getApi(`/user-profile/`, { withCredentials: true });

export const updateUser = async ({ userId, payload }: any) =>
  await patchApi(`/user-update/${userId}/`, payload, {
    withCredentials: true,
  });

export const addUserProfile = async ({ userId, payload }: any) =>
  await postApi(`/profile/${userId}/`, payload, {
    withCredentials: true,
  });

export const updateUserProfile = async ({ slug, payload }: any) =>
  await patchApi(`/profile/${slug}/`, payload, {
    withCredentials: true,
  });

export const updateUserPwd = async (payload: any) =>
  await postApi(`/password/change/`, payload, {
    withCredentials: true,
  });

export const getEmailVerification = async (
  uid: string | undefined,
  token: string | undefined,
  params?: any
) => await getApi(`/verify/${uid}/${token}`, { withCredentials: true, params });

export const resendEmailVerification = async (payload: any) =>
  await postApi(
    '/resend/verification/email/',
    payload,
    {
      withCredentials: true,
    },
    false
  );

export const useFetchLogInStatus = () =>
  useQuery([queries.FETCH_USER], () =>
    getApi('/me/', {
      withCredentials: true,
    })
  );

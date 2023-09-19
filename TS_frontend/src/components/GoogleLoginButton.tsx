import { GoogleIcon } from "@/icons/googleIcon";

interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => (
  <button onClick={onClick}>
    <div className="flex h-[50px] items-center bg-googleBlue  shadow-googleLogin hover:shadow-googleLoginHover">
      <div className="m-[1px] h-[48px] rounded-[1px] bg-white p-[14px]">
        <GoogleIcon className="" />
      </div>
      <div className="flex w-[220px] px-[26px] text-base font-medium leading-[20px] text-white">
        Inloggen met Google
      </div>
    </div>
  </button>
);

export default GoogleLoginButton;

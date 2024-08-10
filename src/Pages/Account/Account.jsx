import { useContext, useEffect, useState } from "react";
import "./Account.css";
import openImg from "../../assets/arrow-open.png";
import closeImg from "../../assets/arrow-close.png";
import profileImg from "../../assets/user_profile.jpg";
import { BottomNav } from "../../Components/BottomNav/BottomNav";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const { removeSidebar, userInfo } = useContext(MyContext);
  const [openBtn, setOpenBtn] = useState(false);
  const navigate = useNavigate()

  const logoutFn = () => {
    const login = localStorage.getItem('login')
    if(login){
      localStorage.setItem('login', false)
      // console.log(localStorage.getItem('login'));
      navigate('/')
    }
  }

  return (
    <>
      <div className="account">
        <h3>Account</h3>
        <div className="profile-page">
          <div className="upper-part">
          <div className="profile-card">
            <img
              src={(userInfo?.picture && userInfo.picture) || profileImg}
              alt="User Avatar"
              className="profile-avatar"
            />
            <h4 className="profile-name">{userInfo?.name || "name"}</h4>
          </div>
          <div className="switch-container">
            <div className="switch-upper">
              <p className="switch-btn">Switch account</p>
              {!openBtn && (
                <img
                  className="close-btn"
                  src={closeImg}
                  alt=""
                  onClick={() => setOpenBtn(true)}
                />
              )}
              {openBtn && (
                <img
                  className="open-btn"
                  src={openImg}
                  alt=""
                  onClick={() => setOpenBtn(false)}
                />
              )}
            </div>
            {openBtn && (
              <p className="profile-email">{userInfo?.email || "email"}</p>
            )}
          </div>
          </div>
          <button className="logout-btn" onClick={()=>logoutFn()}>Logout</button>
        </div>
      </div>
      {removeSidebar && <BottomNav />}
    </>
  );
};

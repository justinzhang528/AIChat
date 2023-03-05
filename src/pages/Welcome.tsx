import { IonButton, IonContent, IonIcon, IonSlide, IonSlides } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import './Welcome.css'

const Welcome: React.FC = () => {

  function handleClick() {
    localStorage.setItem('firstUse','0');
  }

  return (
      <IonContent className="ion-padding">
        <IonSlides pager={true} id='slides'>
          <IonSlide>
            <div className="slide">
              <img src='assets/icon/slide1.png' />
              <h2>Welcome</h2>
              <p>The <b>AIChat</b> is a free professional app that utilizes OpenAI integration.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="slide">
              <img src='assets/icon/slide2.png' />
              <h2>OpenAI API Key</h2>
              <p>You must use the <b>API key provided by OpenAI</b> to access all the features of this app.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="slide">
              <img src='assets/icon/slide3.png' />
              <h2>User Manual</h2>
              <p>Please refer to the <b>User Manual</b> before using.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <img src='assets/icon/slide4.png' />
            <h3>Ready to Chat with Powerful AI?</h3>
            <IonButton fill="clear" href='/' onClick={handleClick}>Continue <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
          </IonSlide>
        </IonSlides>
        </IonContent>
  );
};

export default Welcome;

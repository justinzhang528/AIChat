import { CheckboxChangeEventDetail, IonButton, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToggle, IonToolbar, useIonAlert } from '@ionic/react';
import AIChatComponent from '../components/AIChatComponent'
import GenerateImageComponent from '../components/GenerateImageComponent';
import InstructionComponent from '../components/InstructionComponent';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { useState } from 'react';


const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const showInputAlert=()=>{
    presentAlert({
      header: 'Please Enter Your API Key:',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },  
        {
          text: 'OK',
          role: 'confirm',
          handler: (alertData) => {
              localStorage.setItem('apikey',alertData.apikey);
          },
        },
      ],
      inputs: [
        {
          name: 'apikey',
          type: 'textarea',
          placeholder: 'API Key',
          value: localStorage.getItem('apikey')
        },
      ],
    })
  }

  const [isShowBanner, setShowBanner] = useState(true);
  const showBanner = async () => {
    if(localStorage.getItem('isAdsFree') === 'true'){
      return;
    }
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-3940256099942544/2934735716', // demo ad unit id,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true,
    };
    await AdMob.showBanner(options);
    setShowBanner(false);
  };

  const onToggleChanged=(event: CustomEvent<CheckboxChangeEventDetail>)=>{
    if(event.detail.checked){
      AdMob.hideBanner();
    }else{
      AdMob.resumeBanner();
    }
    localStorage.setItem('isAdsFree',String(event.detail.checked));
  }

  if(isShowBanner)
    showBanner();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AIChat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <div className="container">
            <div className="content-center">
              <IonNavLink routerDirection="forward" component={() => <AIChatComponent />}>
                <IonButton shape="round" class="card-btn">Chat With AI</IonButton>
              </IonNavLink><br></br><br></br>
              <IonNavLink routerDirection="forward" component={() => <GenerateImageComponent />}>
                <IonButton shape="round" class="card-btn">Generate Image</IonButton>
              </IonNavLink><br></br><br></br>
              <IonNavLink routerDirection="forward" component={() => <InstructionComponent />}>
                <IonButton shape="round" class="card-btn">Instruction</IonButton>
              </IonNavLink><br></br><br></br>
              <IonButton shape="round" class="card-btn" onClick={showInputAlert}>Enter API Key</IonButton>
              <h6>AdsFree</h6>
              <IonToggle onIonChange={onToggleChanged} color="success" enableOnOffLabels={true}></IonToggle>
            </div>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default Home;

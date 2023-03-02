import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import AIChatComponent from '../components/AIChatComponent'
import GenerateImageComponent from '../components/GenerateImageComponent';

const Home: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const apiInputRef = useRef<HTMLIonInputElement>(null);
  function dismiss() {
    console.log('clicked')
    modal.current?.dismiss();
  }
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
              <IonButton id="open-api-key-input" shape="round" class="card-btn">Enter API Key</IonButton>
            </div>
          </div>
        </IonContent>        
        <IonModal id="api-key-modal" ref={modal} trigger="open-api-key-input">
          <IonContent>
            <IonToolbar>
              <IonTitle>API KEY</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => {console.log('clicked')}}>
                  Comfirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonItem>
              <IonLabel>Enter Your API Key:</IonLabel>
              <IonInput ref={apiInputRef} placeholder="Your API Key" />
            </IonItem>
          </IonContent>
        </IonModal>
    </IonPage>
  );
};

export default Home;

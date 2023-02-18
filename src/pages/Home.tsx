import { IonButton, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AIChatComponent from '../components/AIChatComponent'
import GenerateImageComponent from '../components/GenerateImageComponent';

const Home: React.FC = () => {
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
              </IonNavLink>
            </div>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default Home;

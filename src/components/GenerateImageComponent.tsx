import React, { useState } from 'react';
import { IonBackButton, IonButtons, IonHeader, IonContent, IonToolbar, IonTitle, IonCard, IonCardHeader, IonIcon, IonCardContent, IonButton, IonTextarea, IonCardSubtitle, IonLabel, IonItem } from '@ionic/react';
import { save } from 'ionicons/icons';
import { Configuration, OpenAIApi } from 'openai';
import config from '../config';

function GenerateImageComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("https://ionicframework.com/docs/img/demos/card-media.png");
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const configuration = new Configuration({
        apiKey: config.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const generateImage = async () => {
        setPlaceholder(`Search ${prompt}..`);
        setLoading(true);
        const res = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "512x512",
        });
        setLoading(false);
        setResult(res.data.data[0].url!);
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = result;
        link.download = 'result.png';
        link.click();
    };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Generate Image</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <div className="container">
            <div className="content-center">                
                <IonCard>
                    <IonCardHeader>
                        <h4>Generated By OpenAI:</h4>
                    </IonCardHeader>
                    <IonCardContent>
                        <img id="myImage" className="result-image" src={result} alt="result" />                        
                        <IonButton color="light" onClick={downloadImage}><IonIcon icon={save}></IonIcon></IonButton>
                    </IonCardContent>
                    <IonItem>
                        <IonLabel position="floating">Write down here to generate image</IonLabel>
                        <IonTextarea placeholder="Type something here" autoGrow={true} onIonChange={(e) => setPrompt(e.detail.value!)}></IonTextarea>
                    </IonItem>
                    
                </IonCard>
                <IonButton color="light" shape="round" class="card-btn" onClick={generateImage}>Generate Image</IonButton>
                
            </div>
        </div>
      </IonContent>
    </>
  );
}

export default GenerateImageComponent;
import './ExploreContainer.css';
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from 'react';
import { IonButton, IonCard, IonContent, IonInput, IonItem, IonLabel } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [inputChatValue, setInputChatValue] = useState('');
  const [outputChatHistory, setOutputChatHistory] = useState<string[]>([]);

  const OPENAI_API_KEY="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";
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function getAIResult () {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputChatValue,
      max_tokens: 2048
    });
    console.log(completion.data.choices[0].text)
    return String(completion.data.choices[0].text);
  }

  const onSendButtonClick =async ()=>{
    setInputChatValue('');
    const result = await Promise.resolve(getAIResult());
    outputChatHistory?.push(result);
    const newHistory = Object.assign([], outputChatHistory);
    setOutputChatHistory(newHistory);
  }

  return (
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Write down here to chat with AI?</IonLabel>
        <IonInput placeholder="Enter text" value={inputChatValue} onIonChange={e => setInputChatValue(e.detail.value!)}></IonInput>
        <IonButton onClick={ () => onSendButtonClick()} shape="round">Send</IonButton><br></br>
      </IonItem>
      {Array.from({length: outputChatHistory?.length}, (_, i) => (
        <IonCard key={i}>        
          <p>{outputChatHistory[i]}</p>
        </IonCard>
      ))}
    </IonContent>
  );
};

export default ExploreContainer;

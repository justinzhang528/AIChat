import './AIChatComponent.css';
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonTextarea, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { person, logoReact } from 'ionicons/icons';
import config from '../config';

function AIChatComponent() {
  const [currentInputChat, setCurrentInputChat] = useState('');
  const [conversationHistory, setConversationHistory] = useState('');
  const [inputChatHistory, setinputChatHistory] = useState<string[]>([]);
  const [outputChatHistory, setOutputChatHistory] = useState<string[]>([]);

  const handleAndGetConversationHistory=()=>{
    let conversation = "";
    for (let i=0; i<outputChatHistory.length; i++){
      conversation = conversation + "Q:" + inputChatHistory[i] + "\n";
      conversation = conversation + "A:" + outputChatHistory[i] + "\n";
    }
    conversation = conversation + "Q:" + currentInputChat;
    setConversationHistory(conversation);
    console.log(conversation);
    return conversation;
  }

  const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function getAIResult(prompt: string) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 2048
    });
    console.log(completion.data.choices[0].text)
    return completion.data.choices[0].text!.trim();
  }

  const onSendButtonClick =async ()=>{
    inputChatHistory.push(currentInputChat);
    const result = await Promise.resolve(getAIResult(handleAndGetConversationHistory()));
    outputChatHistory?.push(result);
    const newOutputChatHistory = Object.assign([], outputChatHistory);
    setOutputChatHistory(newOutputChatHistory);
    const newInputChatHistory = Object.assign([], inputChatHistory);
    setinputChatHistory(newInputChatHistory);
    setCurrentInputChat('');
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>AIChat</IonTitle>
        </IonToolbar>
      </IonHeader>      
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Write down here to chat with AI?</IonLabel>
          <IonTextarea placeholder="Enter text" autoGrow={true} value={currentInputChat} onIonChange={e => setCurrentInputChat(e.detail.value!)}/>
          <IonButton onClick={ () => onSendButtonClick()} color="light" shape="round">Send</IonButton><br></br>
        </IonItem>
        {Array.from({length: outputChatHistory?.length}, (_, i) => (
          <div key={i}>
            <IonCard class="ion-padding">
              <IonIcon icon={person}></IonIcon>:          
              <p>{inputChatHistory[i]}</p>
            </IonCard>
            <IonCard class="ion-padding">
              <IonIcon icon={logoReact}></IonIcon>:
              <p>{outputChatHistory[i]}</p>
            </IonCard>
          </div>
        ))}
      </IonContent>
    </>
  );
};

export default AIChatComponent;

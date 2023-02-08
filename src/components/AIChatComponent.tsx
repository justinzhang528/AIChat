import './AIChatComponent.css';
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTextarea, IonTitle, IonToolbar, IonList, IonAvatar, IonText } from '@ionic/react';
import config from '../config';

interface ChatMessage {
  message: string;
  sender: string;
  time: string;
}

function AIChatComponent() {
  const [currentInputMsg, setCurrentInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const getPromptByChatHistory=()=>{
    let chat = "";
    for (var history of chatHistory){
      if(history.sender === 'Q'){
        chat = chat + "Q: " + history.message + "\n";
      }else{
        chat = chat + "A: " + history.message + "\n";
      }
    }
    console.log(chat);
    return chat;
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();    
    chatHistory.push({
      message: currentInputMsg,
      sender: 'Q',
      time: new Date().toLocaleTimeString()
    });
    setChatHistory(Object.assign([], chatHistory));
    const prompt = getPromptByChatHistory();
    setCurrentInputMsg('');
    let aiMsg = await Promise.resolve(getAIResult(prompt));
    if (aiMsg.startsWith("A: ")) {
      aiMsg = aiMsg.substring(3);
    }
    chatHistory.push({
      message: aiMsg,
      sender: 'A',
      time: new Date().toLocaleTimeString()
    });
    setChatHistory(Object.assign([], chatHistory));
  };

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
      <IonContent>
        <IonList className="chat-history">
          {chatHistory.map((item, index) => (
            <IonItem key={index} className={item.sender === 'Q' ? 'own-message' : 'other-message'}>
              <IonAvatar slot={item.sender === 'Q' ? 'end' : 'start'}>
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
              <IonLabel className="message-content">
                <IonText>
                    <p>{item.message}</p>
                </IonText>
                <p className="message-time">{item.time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <form onSubmit={handleSubmit} className="chat-form">
          <IonTextarea placeholder="Enter message..." autoGrow={true} value={currentInputMsg} onIonChange={e => setCurrentInputMsg(e.detail.value!)}/>
          <IonButton type="submit" shape='round' color='light'>Send</IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default AIChatComponent;

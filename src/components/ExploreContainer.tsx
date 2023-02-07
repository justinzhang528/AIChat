import './ExploreContainer.css';
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from 'react';
import { IonButton, IonCard, IonContent, IonInput, IonItem, IonLabel } from '@ionic/react';
import config from '../config';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
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
      max_tokens: 2048
    });
    console.log(completion.data.choices[0].text)
    return String(completion.data.choices[0].text).trim();
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
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Write down here to chat with AI?</IonLabel>
        <IonInput placeholder="Enter text" value={currentInputChat} onIonChange={e => setCurrentInputChat(e.detail.value!)}></IonInput>
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

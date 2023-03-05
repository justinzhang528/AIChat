import './AIChatComponent.css';
import React, { useRef, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonList, IonAvatar, IonText, IonIcon, useIonToast, IonLoading, IonInput, useIonAlert } from '@ionic/react';
import { send, trash } from 'ionicons/icons';

interface ChatMessage {
  message: string;
  sender: string;
  time: string;
  date: string;
}

function AIChatComponent() {
  const { Configuration, OpenAIApi } = require("openai");
  const [showLoading, setShowLoading] = useState(false);
  const [present] = useIonToast();
  const savedHistoryJson = JSON.parse(localStorage.getItem('chatHistory')!);
  const savedHistory:ChatMessage[] = [];
  if(savedHistoryJson !== null){
    for (var history of savedHistoryJson){
      savedHistory.push(history);
    }
  }
  const [currentInputMsg, setCurrentInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(savedHistory);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const listRef = useRef<HTMLIonListElement>(null);  

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  };

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
    apiKey: localStorage.getItem('apikey')!,
  });
  const openai = new OpenAIApi(configuration);

  async function getAIResult(prompt: string) {
    try{      
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}]
      });
      console.log(completion["data"]["choices"][0]["message"]["content"])
      return completion["data"]["choices"][0]["message"]["content"]!.trim();
    }catch(error: any){
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data.error.message);
        presentToast(error.response.data.error.message);
      } else {        
        console.log(error.message);
        presentToast(error.message);
      }
      return '';
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(currentInputMsg.trim()==='')
      return;      
    setShowLoading(true);
    chatHistory.push({
      message: currentInputMsg.trim(),
      sender: 'Q',
      time: new Date().toLocaleTimeString('en-GB'),
      date: new Date().toLocaleDateString('zh-Hans-CN')
    });
    setChatHistory(Object.assign([], chatHistory));
    const prompt = getPromptByChatHistory();
    setCurrentInputMsg('');
    scrollToBottom();
    let aiMsg = await Promise.resolve(getAIResult(prompt));
    if(aiMsg===''){
      setShowLoading(false);
      return; //if no response from openai api, do nothing
    }   
    aiMsg = aiMsg.trim();
    if (aiMsg.startsWith("A: ")) {
      aiMsg = aiMsg.substring(3);
    }
    chatHistory.push({
      message: aiMsg,
      sender: 'A',
      time: new Date().toLocaleTimeString('en-GB'),
      date: new Date().toLocaleDateString('zh-Hans-CN')
    });
    setChatHistory(Object.assign([], chatHistory));
    scrollToBottom();
    setShowLoading(false);
  };

  const scrollToBottom = () => {
    const scrollHeight = listRef.current?.scrollHeight;
    contentRef.current && contentRef.current.scrollToPoint(0,scrollHeight,600);    
    localStorage.setItem('chatHistory',JSON.stringify(chatHistory));
  }

  const getDateString=(chatDate: string)=>{
    const currentDate:string = new Date().toLocaleDateString('zh-Hans-CN');
    const day:number = (new Date(currentDate).getTime() - new Date(chatDate).getTime())/(1000 * 3600 * 24);
    if(day<1){
      return ''
    }else if(day===1){
      return 'Yesterday'
    }else{
      return chatDate
    }
  }

  const onClearChatHistory=()=>{
    console.log('clear')
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  }

  const [presentAlert] = useIonAlert();
  const showClearConfirmAlert=()=>{
    presentAlert({
      header: 'Are You Sure to Clear Chat History?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },  
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            onClearChatHistory();
          },
        },
      ],
    })
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
      <IonContent scrollEvents={true} ref={contentRef}>
        <IonList ref={listRef} lines='none'>
          {chatHistory.map((item, index) => (
            <IonItem key={index} className={item.sender === 'Q' ? 'own-message' : 'other-message'} lines='none'>
              <IonAvatar slot={item.sender === 'Q' ? 'end' : 'start'}>
                <img src={item.sender === 'Q' ? 'assets/icon/puppy.png' : 'assets/icon/ai.png'} alt='avator'/>
              </IonAvatar>
              <IonLabel className="message-content">
                <IonText>
                    <p style={{whiteSpace: 'pre-wrap'}}>{item.message}</p>
                </IonText>
                <p className="message-time">{getDateString(item.date)} {item.time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <p>{}</p>
      </IonContent>
      <form onSubmit={handleSubmit} className="chat-form">
          <IonIcon icon={trash} class="ion-padding" onClick={showClearConfirmAlert}></IonIcon>
          <IonInput class='textInputBorder' onClick={scrollToBottom} placeholder="Enter message..." value={currentInputMsg} onIonChange={e => setCurrentInputMsg(e.detail.value!)}/>
          <IonButton type='submit' shape='round' color='light'><IonIcon icon={send}></IonIcon></IonButton>
      </form>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Getting Response...'}
      />
    </>
  );
};

export default AIChatComponent;

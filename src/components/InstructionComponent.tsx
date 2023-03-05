import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

function InstructionComponent() {
  
  return (
    <>
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>User Manual</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent class="ion-padding">
      <h3>Please read the following carefully before using this app:</h3>
      <p>If you do not have an OpenAI account yet, please register for one first. (You can login in with Google or Microsoft account)</p>
      <p>If you already have an account, please go to the following website to view your API key:</p>
      <a href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a>
      <p></p>
      <img src='assets/icon/manual1.png' /><p></p>
      <img src='assets/icon/manual2.png' /><p></p>
      <img src='assets/icon/manual3.png' /><p></p>
      <hr className="dashed"></hr>
      <p>The free trial amount for each account is $18 USD.</p>
      <p>1000 tokens = $0.002 USD.</p>
      <p>1000 tokens is approximately equal to 750 English words.</p>
      <p>So, in total, you can ask questions for approximately 9 million English words of instructions using 12,000,000 tokens (assuming an average of 750 words per 1000 tokens).</p>
      <p>The number of Chinese characters you can ask may be less than the number of English words due to the complexity of the Chinese language.</p>
      <hr className="dashed"></hr>
      <p>You can go to the following website to view your personal usage statistics:</p>
      <a href="https://platform.openai.com/account/usage">https://platform.openai.com/account/usage</a>
      <hr className="dashed"></hr>
      <p>You can go to the following website to calculate the number of tokens:</p>
      <a href="https://platform.openai.com/tokenizer">https://platform.openai.com/tokenizer</a>
    </IonContent>
    </>
  );
}
export default InstructionComponent;
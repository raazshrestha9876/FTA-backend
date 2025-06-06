// // service.js
// import * as tf from '@tensorflow/tfjs-node';

// let model = null;

// export async function loadModel() {
//   if (!model) {
//     model = await tf.loadLayersModel('file://./model/model.json');
//   }
//   return model;
// }

// export function preprocess(text) {
//   const input = text.toLowerCase().split('').map(c => c.charCodeAt(0) / 255);
//   return tf.tensor([input], [1, input.length]);
// }

// export async function getResponse(text) {
//   await loadModel();

//   const inputTensor = preprocess(text);
//   const prediction = model.predict(inputTensor);
//   const data = await prediction.data();

//   inputTensor.dispose();
//   prediction.dispose();


//   const maxIndex = data.indexOf(Math.max(...data));
// s
//   const responses = [
//     "Hello! How can I help you?",
//     "I'm a chatbot built with TensorFlow.js!",
//     "Sorry, I didn't understand that."
//   ];

//   return responses[maxIndex] || responses[2];
// }

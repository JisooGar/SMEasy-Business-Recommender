import * as tf from '@tensorflow/tfjs';

// Function to create the TensorFlow model
export function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [3], units: 16, activation: 'relu'}));
    model.add(tf.layers.dense({units: 8, activation: 'relu'}));
    model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}

// Function to train the model
export async function trainModel(model, data, labels) {
    const xs = tf.tensor2d(data);
    const ys = tf.tensor2d(labels);

    await model.fit(xs, ys, {
        epochs: 100,
        shuffle: true
    });
}

// Function to make predictions
export async function predictBarangay(model, businessCount, population, gaps) {
    const input = tf.tensor2d([[businessCount, population, gaps]]);
    const prediction = model.predict(input);
    const result = await prediction.array();
    return result[0];
}

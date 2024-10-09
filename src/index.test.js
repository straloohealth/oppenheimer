const fetch = require('node-fetch');

describe('GraphQL Server Tests', () => {
  const endpointURL = 'https://mobius.api.straloo.com.br';
  const loginURL = `${endpointURL}/login`;
  const graphqlURL = `${endpointURL}/graphql`;
  let accessToken;

  beforeAll(async () => {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: '+5511968427903',
        code: '1234'
      })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    accessToken = data.accessToken;
  });

  test('should get info about me', async () => {
    const query = `
            {
                me {
                    id
                    name
                }
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('me');
    expect(data.data.me).toHaveProperty('id');
    expect(data.data.me).toHaveProperty('name');
    expect(data.data.me.name).toBe('John Doe');
  });

  test('should request program for current date', async () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const query = `
            {
                program(date: "${dateStr}") {
                    variant
                    exercises {
                        exerciseId
                        exercise {
                            name
                            description
                            videoURL
                            videoInstructionURL
                            unit
                        }
                        sets
                        repetitions
                        rest
                        activity {
                            done
                        }
                    }
                }
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('program');
    expect(data.data.program).toHaveProperty('variant');
  });

  test('should fetch image of all exercises finished', async () => {
    const query = `
            {
                finishExercisesShareableImage
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('finishExercisesShareableImage');
  });

  test('should register activity', async () => {
    const activity = {
      exerciseId: '60d21b4667d0d8992e610c85', // Example MongoDB ObjectId
      repetitions: 10,
      sets: 3
    };

    const mutation = `
            mutation {
                registerActivity(
                    activity: {
                        exerciseId: "${activity.exerciseId}",
                        repetitions: ${activity.repetitions},
                        sets: ${activity.sets}
                    }
                ) {
                    id
                }
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query: mutation })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('registerActivity');
    expect(data.data.registerActivity).toHaveProperty('id');
  });

  test('should answer form', async () => {
    const mutation = `
            mutation {
                answerForm(
                    input: {
                        formId: "60d21b4667d0d8992e610c85",
                        answers: [
                            {
                                questionId: "60d21b4667d0d8992e610c86",
                                questionLabel: "How are you feeling today?",
                                answer: "Good",
                                answerType: TEXT
                            },
                            {
                                questionId: "60d21b4667d0d8992e610c87",
                                questionLabel: "Rate your energy level",
                                answer: "8",
                                answerType: NUMBER
                            }
                        ]
                    }
                ) {
                    id
                }
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query: mutation })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('answerForm');
    expect(data.data.answerForm).toHaveProperty('id');
  });

  test('should get data collection', async () => {
    const query = `
            {
                dataCollection {
                    hasMessages
                    hasNotes
                    missingFormResponses
                }
            }
        `;

    const response = await fetch(graphqlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    console.log(data);
    expect(data.data).toHaveProperty('dataCollection');
    expect(data.data.dataCollection).toHaveProperty('hasMessages');
    expect(data.data.dataCollection).toHaveProperty('hasNotes');
    expect(data.data.dataCollection).toHaveProperty('missingFormResponses');
  });
});

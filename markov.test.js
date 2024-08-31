const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
  test('generates text', () => {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText();
    expect(text).toBeTruthy();
  });

  test('chains are built correctly', () => {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
      the: ['cat', 'hat'],
      cat: ['in'],
      in: ['the'],
      hat: [null] 
    });
  });
});

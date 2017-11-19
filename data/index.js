Vue.component('anim-word', { 
  props: ['text'],
  template: `
  <div>
    <span class="letter" v-for="(letter, index) in text.letters" 
      @click="$emit('poof', text.id, letter.char)"
      v-bind:class="{ poofed: !letter.alive }"
    >
      <div class="character">{{ letter.char }}</div> 
      <span></span>
    </span>
  </div>
  ` 
});



new Vue({
  el: '#app',
  data: {
    clickTimes: 0,
    word1: {
      id: 1,
      letters: [
        { char:'с', alive: true },
        { char:'_', alive: true },
        { char:'д', alive: true },
        { char:'н', alive: true },
        { char:'ё', alive: false },
        { char:'м', alive: true }
      ]
    },
    word2: {
      id: 2,
      letters: [
        { char: 'р', alive: true },
        { char: 'о', alive: true },
        { char: 'ж', alive: true },
        { char: 'д', alive: true },
        { char: 'е', alive: false },
        { char: 'н', alive: true },
        { char: 'и', alive: true },
        { char: '_', alive: true },
		{ char: 'я', alive: true }
      ]
    },
    totalLetters: 0
  },
  mounted(){
    this.totalLetters = this.word1.letters.length + this.word2.letters.length; 
  },
  methods: {
    rem(id, letter){
      // update text
      if(! this.clicked){
        this.clickTimes++;
      }
      
      // word 1
      if(id === 1){
        this.word1.letters = this.word1.letters.map(function(item){
          if(item.char == letter){
            item.alive = false;
          }
          return item;
        });
      }
      // word 2
      else if (id === 2){
        this.word2.letters = this.word2.letters.map(function(item){
          if(item.char === letter && item.alive !== false){
            item.alive = false;
            letter= null;
          }
          return item;
        });
      }
    },
    
    back(){
      // Reset text
      this.clickTimes = 0;
      
      // Restore letter position
      this.word1.letters = this.word1.letters.map(function(item){
        item.alive = true; 
        return item;
      });
      this.word2.letters = this.word2.letters.map(function(item){
        item.alive = true; 
        return item;
      });
      
    }
  }
})
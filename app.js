const vm = new Vue({
  el: "#app",
  data: {
    hautGauche: false,
    hautDroit: false,
    basGauche: false,
    basDroit: false,
    sequence: [],
    tmp: [],
    squareMapping: ["hautGauche", "hautDroit", "basGauche", "basDroit"],
  },
  computed: {
    score() {
      const value = this.sequence.length - 1;
      return value < 0 ? 0 : value;
    },
  },
  methods: {
    addElToSequence() {
      this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
      this.tmp = this.sequence.slice(); // on copie le tableau sequence par valeur
    },
    newGame() {
      this.sequence = [];
      this.nextTurn();
    },
    nextTurn() {
      this.addElToSequence();
      this.allGray();
      this.playSequence(this.tmp[0]);
    },
    allGray() {
      this.hautGauche = false;
      this.hautDroit = false;
      this.basGauche = false;
      this.basDroit = false;
    },
    playSequence(instruction) {
      this[instruction] = true;
      setTimeout(() => {
        vm.tmp.shift();
        this.allGray();
        if (vm.tmp[0]) {
          setTimeout(() => {
            vm.playSequence(vm.tmp[0]);
          }, 500);
        } else {
          vm.tmp = vm.sequence.slice();
        }
      }, 500);
    },
    selectSquare(instruction) {
      if (instruction == this.tmp[0]) {
        this[instruction] = true;
        setTimeout(() => {
          vm.allGray()
          vm.tmp.shift();
          if (!vm.tmp[0]) {
            vm.nextTurn();
          }
        }, 500);
      } else {
        alert("Perdu !");
      }
    },
  },
});

let timeoutPopup
let timeoutCheat = 0
let sound = new Audio('assets/media/gtasa.mp3')
let cheat = {

    output: '',

    init: function()
    {
        document.onkeydown = cheat.myKeyPress

        setInterval( function(){
            timeoutCheat += 1
        }, 1000)
    },

    show: function()
    {
        this.showCheat()
        this.playSound()
    },

    showCheat: function()
    {
        clearTimeout(timeoutPopup)

        document.getElementById('popup-cheat').style.display = "block"
        timeoutPopup = setTimeout(function() {
            document.getElementById('popup-cheat').style.display = "none"
        }, 3000)
    },

    playSound: function()
    {
        sound.play()
    },

    clearOutput: function()
    {
        this.output = ''
    },

    getOutput: function()
    {
        return this.output
    },

    setOutput: function(output)
    {
        this.output += output
    },

    validate: function(keyLetter)
    {
        let self = this

        // Expira teclas digitadas
        if (timeoutCheat >= 2)
            self.clearOutput()

        // Limpa as teclas após 8 digitos
        if(self.getOutput().length > 8)
            self.clearOutput()


        // Apenas teclas com caracteres são considerados (não mais ctrl/shift/etc)
        if (!/[a-zA-Z]/.test(keyLetter))
            return false

        return true
    },

    myKeyPress: function(e)
    {
        let keyNum,
            keyLetter,
            res

        if (window.event)
            keyNum = e.keyCode
        else if (e.which)
            keyNum = e.which

        keyLetter = String.fromCharCode(keyNum)

        if (!cheat.validate(keyLetter))
            return false

        cheat.setOutput(keyLetter)

        arrCheats.find(function(cheatInCheats)
        {
            res = cheatInCheats.search(cheat.output)

            if(cheatInCheats === cheat.output) {
                cheat.show()
                cheat.clearOutput()
            }
        })

        timeoutCheat = 0
    },
}
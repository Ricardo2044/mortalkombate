const Menssages = {
    EVENT: 'event',
    LIFE_UPDATE: 'life-update',
    POSITION_UPDATE: 'position-update',
    PLAYER_CONNECTED: 'player-connected',
}

function Game (id, gameCollection) {
    this._id = id;
    this._gameCollection = gameCollection
    this._players = [];
}
Game.prototype.getId = () => this._id;
Game.prototype.addPlayer = (p) => {
    if (this._players.length > 1){
      return false
    } 

    this._players.push(p);
    if (this.player.legth > 1) {
        this._addHadlers();
        this._players[0].emit(Menssages.PLAYER_CONNECTED, 0);
    }
    return true;
}

Game.prototype._addHadlers = () => {
    let p1 = this._players[0], 
        p2 = this._players[1],
        m = Menssages,
        self = this;
    p1.on(m.EVENT, (data) =>{
        p2.emit(m.EVENT, data);
    });
    p1.on(m.LIFE_UPDATE, (data) =>{
        p2.emit(m.LIFE_UPDATE, data);
    });
    p1.on(m.POSITION_UPDATE, (data) =>{
        p2.emit(m.POSITION_UPDATE, data);
    });

    p2.on(m.EVENT, (data) =>{
        p1.emit(m.EVENT, data);
    });
    p2.on(m.LIFE_UPDATE, (data) =>{
        p1.emit(m.LIFE_UPDATE, data);
    });
    p2.on(m.POSITION_UPDATE, (data) =>{
        p1.emit(m.POSITION_UPDATE, data);
    });

    p1.on('disconnect', ()=>{
        self.endGame(0)
    });

    p2.on('disconnect', ()=>{
        self.endGame(1)
    });
};

Game.prototype.endGame = (playerOut) =>{
    if (!this._players.legth) return;
    let opponent = +!playerOut;
    opponent = this._players[opponent]
}



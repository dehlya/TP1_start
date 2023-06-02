import { Room } from "./room";

class Layer {

    constructor() {
      this.enemies = [];
      this.decorations = [];
    }
  
    // Méthode pour gérer la mort des ennemis
    handleEnemyDeath(enemy) {
      // Code pour gérer la mort de l'ennemi
    }
  }
  
  
  // Création d'une instance de Room avec un niveau 1
  const room = new Room(1);

  // Ajout d'un ennemi dans le layer
  room.layer.enemies.push({ x: 10, y: 20 });
  
  // Ajout d'une décoration dans le layer
  room.layer.decorations.push({ type: 'tree', x: 5, y: 15 });
  
  // Gestion de la mort d'un ennemi
  room.layer.handleEnemyDeath(room.layer.enemies[0]);
  
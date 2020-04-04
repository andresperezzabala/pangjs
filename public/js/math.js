class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get(target, prop) {
        return this[prop] || 'MAGIC';
    }

    add(other){
        // si other es una instancia de Vec2D
        if (other instanceof Vec2D){
            // anyadir other a this como vector
            this.x += other.x;
            this.y += other.y;
        // si no,
        }else{
            // anyadir other a this como escalar
            this.x += other;
            this.y += other;
        }
        //
        // devolver this
        return this;
    }

    _mul(other){
        // devolver un nuevo vector igual a
        // this multiplicado por el escalar other
        return new Vec2D(this.x*other,this.y*other);
    }

    equals(other) {
        // devuelve true si this es aproximadamente igual a other (igual con una diferencia máxima de epsilon=0.1
        return Math.sqrt((this.x - other.x)^2 + (this.y - other.y)^2 ) <= 0.1
    }

    static approx_equal(a, b, epsilon) {
        // devuelve true proppropsi a aprox. igual a b
        // iguales salvo una diferencia absoluta
        // máxima de epsilon
        return Math.sqrt((a-b)^2) <= epsilon;
    }
}

// clase Object2D. Representa un objeto 2D caracterizado por un vector size
// (diagonal del rectángulo que circunscribe el objeto) y una posición
// superior izquierda x,y.

class Object2D {

    constructor(size, position){
        this.size = size;
        this.position = position;
    }

    get x(){
        return this.position.x;
    }

    get y(){
        return this.position.y;
    }

    get width(){
        return this.size.x;
    }

    get height(){
        return this.size.y;
    }

}

export { Object2D };
export { Vec2D };
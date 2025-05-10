class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	add(vector){
		this.x += vector.x;
		this.y += vector.y;
	}

	addTo(value){
		this.x += value;
		this.y += value;
	}

	subtract(vector){
		return new Vector(this.x - vector.x, this.y - vector.y);
	}

	mult(scalar){
		return new Vector(this.x * scalar, this.y * scalar);
	}

	dot(vector){
		return this.x * vector.x + this.y * vector.y;
	}

	length(){
		return Math.floor(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
	}
}
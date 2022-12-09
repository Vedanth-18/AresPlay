class Obstacle{
    constructor(x, y, z, scale, texture, model){
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.model = model
        this.texture =texture;
    }
    display(){
        push();
        scale(this.scale);
        noStroke();
        translate(this.x, this.y, this.z);
        texture(this.texture);
        model(this.model);
        pop();
    }
}
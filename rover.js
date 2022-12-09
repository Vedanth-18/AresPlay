class Rover{
    constructor(x, y, z, width, height, scale, texture){
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.texture =texture;
    }
    display(){
        push();
        scale(this.scale);
        noStroke();
        translate(this.x, this.y, this.z);
        texture(this.texture);
        plane(this.width, this.height);
        pop();
    }
    collision(xc, yc, zc, lc, bc, hc){
            if((this.x - xc) < ((this.width/2) + (lc/2)) && (xc - this.x) < ((this.width/2) + (lc/2))
            && (this.y - yc) < ((this.height/2) + (bc/2)) && (yc - this.y) < ((this.height/2) + (bc/2))
            && (this.z - zc) < ((0) + (hc/2)) && (zc - this.z) < ((0) + (hc/2)))
            {
              collison_state = 'True';
              function_state = 'False';
            }
          }
}
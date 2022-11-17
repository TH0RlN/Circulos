/**
 * 
 * @param {Object} int 
 * @param {Object} ext 
 * @param {CanvasRenderingContext2D} ctx 
 */
function loop(int, ext, ctx)
{
    ctx.clearRect(0, 0, 800, 800);
    if (int.moving > 0)
        int.ang += int.speed;
    int.refresh();
    circulo(ext.posX, ext.posY, ext.r, 0, 2*Math.PI, ctx, 'blue', false);
    circulo(int.posX, int.posY, int.r, 0, 2*Math.PI, ctx, 'red', true);
}

/**
 * Dibuja un circulo con los datos dados
 * @param {int}                         x
 * @param {int}                         y
 * @param {int}                         r
 * @param {float}                       i 
 * @param {float}                       f
 * @param {CanvasRenderingContext2D}    ctx
 * @param {string}                      color
 * @param {boolean}                     fill
 */
function circulo(x, y, r, i, f, ctx, color, fill)
    {
        var grad            = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'red');
        grad.addColorStop(1, 'white');
        ctx.beginPath();
        ctx.strokeStyle     = color;
        ctx.fillStyle       = grad;
        ctx.lineWidth       = 0;
        ctx.arc(x, y, r, i, f);
        ctx.stroke();
        if (fill)
            ctx.fill();
        ctx.closePath();
    }

function main()
{
    /**
     * @type {HTMLCanvasElement}
     */
    var canvas  = document.getElementById('canvas');
    /**
     * @type {CanvasRenderingContext2D}
     */
    var ctx     = canvas.getContext('2d');

    var press = false;

    var ext = 
    {
        r       : 200,
        posX    : canvas.width / 2,
        posY    : canvas.height / 2,
    };

    var int = 
    {
        r       : 80,
        d       : 0,
        ang     : 0,
        posX    : 0,
        posY    : 0,
        moving  : -1,
        speed   : 0.01,

        move    : function ()
        {
            this.moving *= -1;
        },

        refresh : function ()
        {
            int.posX    = int.d * Math.cos(int.ang) + ext.posX;
            int.posY    = int.d * Math.sin(int.ang) + ext.posY;
        }
    };

    int.d = ext.r - int.r;
    int.refresh();

    circulo(ext.posX, ext.posY, ext.r, 0, 2*Math.PI, ctx, 'blue');
    circulo(int.posX, int.posY, int.r, 0, 2*Math.PI, ctx, 'red');

    document.addEventListener('keydown', evt =>
    {
        console.log(evt.key);
        if (evt.key == ' ')
        {
            if (!press)
                int.move();
            press = true;
        }

        if (evt.key == '0')
            int.speed =  .001;
        if (evt.key == '1')
            int.speed =  .01;
        if (evt.key == '2')
            int.speed =  .05;
        if (evt.key == '3')
            int.speed =  .1;
        if (evt.key == '4')
            int.speed =  .5;
        if (evt.key == '5')
            int.speed =  -.001;
        if (evt.key == '6')
            int.speed =  -.01;
        if (evt.key == '7')
            int.speed =  -.05;
        if (evt.key == '8')
            int.speed =  -.1;
        if (evt.key == '9')
            int.speed =  -.5;
    });
    
    document.addEventListener('keyup', evt =>
    {
        if (evt.key == ' ')
        {
            press = false;
        }
    });

    setInterval(loop, 1, int, ext, ctx);
}

main();
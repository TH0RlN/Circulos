function line(x1, y1, x2, y2, ctx)
{
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function lines(array, ext, ctx)
{
    for (var i = 0; i < array.length; i++)
    {
        for (var j = 0; j < array.length; j++)
        {
            if (i != j)
                line(array[i].posX, array[i].posY, array[j].posX, array[j].posY, ctx);
                //line(array[i].posX, array[i].posY, ext.posX, ext.posY, ctx);
        }
    }
}

/**
 * 
 * @param {Object} int 
 * @param {Object} ext 
 * @param {CanvasRenderingContext2D} ctx 
 */
function loop(tanExt2, tanExt, intInt, int, ext, ctx)
{
    ctx.clearRect(0, 0, 800, 800);
    if (int.moving > 0)
        int.ang += int.speed;
    if (intInt.moving > 0)
        intInt.ang += intInt.speed;
    if (tanExt.moving > 0)
        tanExt.ang += tanExt.speed;
    if (tanExt2.moving > 0)
        tanExt2.ang += tanExt2.speed;
    int.refresh();
    intInt.refresh();
    tanExt.refresh();
    tanExt2.refresh();
    circulo(ext.posX, ext.posY, ext.r, 0, 2*Math.PI, ctx, 'blue', false);
    circulo(int.posX, int.posY, int.r, 0, 2*Math.PI, ctx, 'red', true);
    circulo(intInt.posX, intInt.posY, intInt.r, 0, 2*Math.PI, ctx, 'green', false);
    circulo(tanExt.posX, tanExt.posY, tanExt.r, 0, 2*Math.PI, ctx, 'purple', false);
    circulo(tanExt2.posX, tanExt2.posY, tanExt2.r, 0, 2*Math.PI, ctx, 'purple', false);
    lines(new Array(tanExt2, tanExt, intInt, int), ext, ctx);
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
        speed   : 0.00001,

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

    var intInt = 
    {
        r       : 10,
        d       : 0,
        ang     : 0,
        posX    : 0,
        posY    : 0,
        moving  : -1,
        speed   : -0.015,

        move    : function ()
        {
            this.moving *= -1;
        },

        refresh : function ()
        {
            intInt.posX    = intInt.d * Math.cos(intInt.ang) + int.posX;
            intInt.posY    = intInt.d * Math.sin(intInt.ang) + int.posY;
        }
    };

    var tanExt = 
    {
        r       : 45,
        d       : 0,
        ang     : 0,
        posX    : 0,
        posY    : 0,
        moving  : -1,
        speed   : -0.001,

        move    : function ()
        {
            this.moving *= -1;
        },

        refresh : function ()
        {
            tanExt.posX    = tanExt.d * Math.cos(tanExt.ang) + ext.posX;
            tanExt.posY    = tanExt.d * Math.sin(tanExt.ang) + ext.posY;
        }
    };
    
    var tanExt2 = 
    {
        r       : 45,
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
            tanExt2.posX    = tanExt2.d * Math.cos(tanExt2.ang) + ext.posX;
            tanExt2.posY    = tanExt2.d * Math.sin(tanExt2.ang) + ext.posY;
        }
    };

    int.d = ext.r + int.r;
    intInt.d = int.r + intInt.r;
    tanExt.d = ext.r + tanExt.r;
    tanExt2.d = ext.r - tanExt2.r;
    int.refresh();
    intInt.refresh();
    tanExt.refresh();
    tanExt2.refresh();

    circulo(ext.posX, ext.posY, ext.r, 0, 2*Math.PI, ctx, 'blue');
    circulo(int.posX, int.posY, int.r, 0, 2*Math.PI, ctx, 'red');
    circulo(intInt.posX, intInt.posY, intInt.r, 0, 2*Math.PI, ctx, 'green');
    circulo(tanExt.posX, tanExt.posY, tanExt.r, 0, 2*Math.PI, ctx, 'purple');
    circulo(tanExt2.posX, tanExt2.posY, tanExt2.r, 0, 2*Math.PI, ctx, 'purple');

    document.addEventListener('keydown', evt =>
    {
        console.log(evt.key);
        if (evt.key == ' ')
        {
            if (!press)
            {
                int.move();
                intInt.move();
                tanExt.move();
                tanExt2.move();
            }
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

    setInterval(loop, 1, tanExt2, tanExt, intInt, int, ext, ctx);
}

main();
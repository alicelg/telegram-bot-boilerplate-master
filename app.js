const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Telegraf = require('telegraf');
const usuario = require('./models/usuario');


let foto = 'https://drive.google.com/drive/my-drive'

/* TOKEN puesto 👍🏻 */
const bot = new Telegraf('1467431714:AAGebzct3_l_oMl8Fw0HO8MK1grVtHbGVks');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
require('./dbConfig'); //requiero el fichero creado dbConfig

app.use(bot.webhookCallback('/secret-path'))


// Modifica la URL
bot.telegram.setWebhook('https://f69f510124d9.ngrok.io/secret-path')

app.post('/secret-path', (req, res) => {
  res.end('Finaliza petición')
})

/* MIDDLEWARE */

bot.use(async (ctx, next) => {
  usuario.create({
    user_name: ctx.message.from.user_name,
    first_name: ctx.message.from.first_name,
    last_name: ctx.message.from.last_name,
    id: ctx.message.from.id
  })
  await next()
});



/* FIN DEL MIDDLEWARE */


/*  */
bot.command('random', async (ctx) => {
  const usuarios = await usuario.find()
  bot.telegram.sendMessage(usuarios[0].id, 'Hola desde random')
});

bot.command('test', (ctx) => {
  ctx.reply('Hola amiguito');
});

/* Primer comando START, recupero el nombre y primer mensaje */
bot.command('start', (ctx) => {
  let nombre = ctx.message.from.first_name
  ctx.reply(`¡Hola ${nombre}! Soy PepeBot 💂🏻\n\n ¿Te cuento un chiste? 🤪  \n\n Para contarte un chiste ve a /info`)
});


bot.command('info', (ctx) => {
  console.log(ctx.message);
  ctx.reply('Tienes un día aburrido, riete un rato con: \n \n /chisteRandom = Riete un rato \n /top10 = Los 10 mejores \n /chisteDay = El chiste del día \n /ayuda = ¿Necesitas ayuda?  \n /creator = Conocenos \n ');
});

/* un chiste random */
bot.command('chisteRandom', (ctx) => {
  ctx.reply('—Buenas, venía a donar un riñón. \n —¿Apellido?\n —Maldonado.\n —¿Ya se está arrepintiendo?');
});

/* top 10 de chistes */
bot.command('top10', (ctx) => {
  ctx.reply('Los mejores 10 chistes:  \n \n 🏆 1. 2. 3. 4. 5. 6. 7. 8.  9. 10. ');
});

/* un chiste random */
bot.command('chisteDay', (ctx) => {
  ctx.reply('');
});

// Comando de ayuda
bot.command('ayuda', (ctx) => ctx.reply('Hola soy PepeBot, me gustan los chistes, no todos son buenos, pero a mi me dan mucha risa. Puedes verlos en: \n \n /chisteRandom 🤪 \n /top10 🏆'))

/* nosotros */
bot.command('creator', (ctx) => {
  return ctx.replyWithPhoto(foto), ctx.reply('PepeBot: by Laura, Alfredo, Leticia y Alice \nCopyright©-2020')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/* app.use('/api', apiRouter); */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

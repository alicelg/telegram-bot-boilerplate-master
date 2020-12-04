const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Telegraf = require('telegraf');

let foto = 'https://drive.google.com/drive/my-drive'

/* TOKEN puesto 👍🏻 */
const bot = new Telegraf('1467431714:AAGebzct3_l_oMl8Fw0HO8MK1grVtHbGVks');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
/* const apiRouter = require('./routes/api'); */

const app = express();

app.use(bot.webhookCallback('/secret-path'))
// Modifica la URL
bot.telegram.setWebhook('https://f69f510124d9.ngrok.io/secret-path')

app.post('/secret-path', (req, res) => {
  res.end('Finaliza petición')
})

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
  ctx.reply('Tienes un día aburrido, riete un rato con: \n \n /chisteRandom = Riete un rato \n /top10 = los 10 mejores chistes \n /creator = Conocenos \n ');
});


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

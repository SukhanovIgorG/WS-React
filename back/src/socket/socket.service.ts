import { Injectable } from '@nestjs/common';
import { askWords, byWords, containsAnyWord, hiWords } from './utils';

@Injectable()
export class SocketService {

  generateMessage(text: string) {
    let answer = 'Не совсем тебя понял, можешь подробнее описать вопрос';
    if (containsAnyWord(text, hiWords)) {
      answer = 'Привет, рад тебя слышать! Как твои дела?';
    } else if (containsAnyWord(text, askWords)) {
      answer = 'Мои дела хорошо, но я знаю, что можно улучшить 😀';
    } else if (containsAnyWord(text, byWords)) {
      answer = 'Пока! Пиши еще, если захочешь пообщаться)';
    }
    return answer;
  }
};


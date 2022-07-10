#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAXCHARSPERLINE 30

char guess[5];


int loadGuess()
{
  printf("Enter 5 characters, using the following:\n");
  printf("  _ --> UNKNOWN\n");
  printf("  a --> known letter\n");
  printf("  A --> known letter and position\n");
  printf("\n");
  scanf("%5s", guess);
  if (strlen(guess) < 5)
  {
    return -1;
  }

  printf("\n\nYou entered: %s\n\n", guess);

  return 0;
}

bool wordContainsLetter(char word[5], char letter)
{
  for (int i=0; i<5; i++)
  {
    if (word[i] == letter) return true;
  }

  return false;
}

bool wordContainsLetterInPosition(char *word[5], char *letter, int position)
{
  return word[position] == tolower(*letter);
  for (int i=0; i<5; i++)
  {
    if (word[i] == letter) return true;
  }

  return false;
}

int solve()
{
  puts("Found these words:\n\n");
  
  FILE *fp;
  char word[MAXCHARSPERLINE];

  /* opening file for reading */
  fp = fopen("wordlist.txt", "r");
  if (fp == NULL)
  {
    perror("Error opening file");
    return (-1);
  }

  while (fgets(word, MAXCHARSPERLINE, fp) != NULL)
  {
    // wordle uses 5-letter words only -- include terminating char
    if (strlen(word) == 6)
    {
      int wordIsMatch = 1;  // assume it's a match until it isn't

      // iterate over guess and find matches
      for (int guessLetter=0; guessLetter < 5; guessLetter++)
      {
        char c = guess[guessLetter];

        if (c != '_')
        {
          // is guess lower or upper case?
          bool isUpper = (c >= 'A' && c <= 'Z');

          // iterate over word and see if it contains letter guess
          int wordIncludesGuessLetter = 0;

          for (int wordLetter=0; wordLetter < 5; wordLetter++)
          {
            // match letters found anywhere in the word except the stated position if lower case
            if (!isUpper) 
            {
              if (word[wordLetter] == c && wordLetter != guessLetter)
              {
                wordIncludesGuessLetter = 1;
                break;  // break out of word iterator
              }
            }
            else
            {
              if (word[wordLetter] == c && wordLetter == guessLetter)
              {
                wordIncludesGuessLetter = 1;
                break;  // break out of word iterator
              }
            }
          }

          if (wordIncludesGuessLetter == 0) 
          {
            wordIsMatch = 0;
            break;  // break out of guess iterator
          }
        }
      }
      
      if (wordIsMatch == 1)
        puts(word);
    }
  }

  fclose(fp);

  return 0;
}


int main(int argc, char *argv[])
{
  int ok;
  ok = loadGuess();
  if (ok == -1)
  {
    perror("Invalid guess. You need to enter a 5-character guess.\n");
    return -1;
  }

  ok = solve();
  return ok;
}

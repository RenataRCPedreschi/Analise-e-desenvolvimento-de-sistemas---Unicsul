
#include <stdio.h>

int main() {
    int almocos[7];
    int total = 0;
    int maior = 0;
    float media;

    char *dias[7] = {
        "Segunda-feira",
        "Terca-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sabado",
        "Domingo"
    };

    // Apresentacao inicial do sistema
    printf("========================================\n");
    printf("     CONTROLE SEMANAL DE ALMOCOS\n");
    printf("========================================\n");
    printf("Bem-vindo(a) ao sistema!\n");
    printf("Informe a quantidade de almocos servidos\n");
    printf("em cada dia da semana.\n\n");

    // Leitura e armazenamento dos dados no vetor
    for (int i = 0; i < 7; i++) {
        int entradaValida = 0;

        while (!entradaValida) {
            printf("%s - Quantidade de almocos: ", dias[i]);

            if (scanf("%d", &almocos[i]) != 1) {
                printf("Entrada invalida! Digite um numero inteiro.\n");

                // Limpa os caracteres invalidos da entrada
                int caractere;
                while ((caractere = getchar()) != '\n' &&
                       caractere != EOF) {
                }

            } else if (almocos[i] < 0) {
                printf("Erro! A quantidade nao pode ser negativa.\n");

            } else {
                entradaValida = 1;
            }
        }
    }

    // Percorre o vetor para calcular o total semanal
    for (int i = 0; i < 7; i++) {
        total += almocos[i];

        // Identifica a maior quantidade registrada
        if (almocos[i] > maior) {
            maior = almocos[i];
        }
    }

    // Desafio bonus: calculo da media diaria
    media = total / 7.0f;

    // Exibicao dos dados armazenados
    printf("\n========================================\n");
    printf("           RESUMO SEMANAL\n");
    printf("========================================\n");

    printf("%-18s | %s\n", "DIA", "ALMOCOS");
    printf("----------------------------------------\n");

    for (int i = 0; i < 7; i++) {
        printf("%-18s | %d\n", dias[i], almocos[i]);
    }

    printf("----------------------------------------\n");

    // Apresentacao dos resultados finais
    printf("Total semanal: %d almocos\n", total);
    printf("Media diaria: %.2f almocos\n", media);
    printf("Maior quantidade em um dia: %d\n", maior);

    printf("\n========================================\n");
    printf("Controle semanal finalizado com sucesso!\n");
    printf("Obrigado por utilizar nosso sistema!\n");
    printf("========================================\n");

    return 0;
}

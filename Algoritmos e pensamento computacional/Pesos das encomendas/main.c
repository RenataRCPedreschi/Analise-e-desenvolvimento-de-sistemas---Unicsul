
#include <stdio.h>

#define TAMANHO 10

int main() {
    // Vetor com os pesos de 10 encomendas (em kg)
    float pesos[TAMANHO] = {
        2.5, 1.2, 5.8, 3.4, 0.9,
        7.1, 4.6, 1.8, 6.3, 3.0
    };

    float crescente[TAMANHO];
    float decrescente[TAMANHO];
    float auxiliar;
    int i, j;

    // Copia os dados para preservar o vetor original
    for (i = 0; i < TAMANHO; i++) {
        crescente[i] = pesos[i];
        decrescente[i] = pesos[i];
    }

    // Apresentacao inicial do sistema
    printf("========================================\n");
    printf("    SISTEMA DE CONTROLE DE ENCOMENDAS\n");
    printf("========================================\n");
    printf("Bem-vindo(a) ao sistema!\n");
    printf("Este programa organiza os pesos de 10\n");
    printf("encomendas utilizando o Bubble Sort.\n");

    // Exibicao dos pesos originais
    printf("\n===== PESOS ORIGINAIS =====\n");

    for (i = 0; i < TAMANHO; i++) {
        printf("Pacote %2d: %.2f kg\n", i + 1, pesos[i]);
    }

    // Bubble Sort: ordenacao crescente
    for (i = 0; i < TAMANHO - 1; i++) {
        for (j = 0; j < TAMANHO - 1 - i; j++) {
            if (crescente[j] > crescente[j + 1]) {
                auxiliar = crescente[j];
                crescente[j] = crescente[j + 1];
                crescente[j + 1] = auxiliar;
            }
        }
    }

    // Bubble Sort: ordenacao decrescente
    for (i = 0; i < TAMANHO - 1; i++) {
        for (j = 0; j < TAMANHO - 1 - i; j++) {
            if (decrescente[j] < decrescente[j + 1]) {
                auxiliar = decrescente[j];
                decrescente[j] = decrescente[j + 1];
                decrescente[j + 1] = auxiliar;
            }
        }
    }

    // Exibicao dos pesos em ordem crescente
    printf("\n===== ORDEM CRESCENTE =====\n");
    printf("Do pacote mais leve ao mais pesado:\n");

    for (i = 0; i < TAMANHO; i++) {
        printf("%.2f kg\n", crescente[i]);
    }

    // Exibicao dos pesos em ordem decrescente
    printf("\n===== ORDEM DECRESCENTE =====\n");
    printf("Do pacote mais pesado ao mais leve:\n");

    for (i = 0; i < TAMANHO; i++) {
        printf("%.2f kg\n", decrescente[i]);
    }

    // Encerramento do sistema
    printf("\n========================================\n");
    printf("Ordenacao concluida com sucesso!\n");
    printf("Obrigado por utilizar nosso sistema!\n");
    printf("========================================\n");

    return 0;
}

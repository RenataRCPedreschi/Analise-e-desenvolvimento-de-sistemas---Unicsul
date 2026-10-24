```c
#include <stdio.h>

int main() {
    int opcao;
    float peso, altura, imc;

    printf("====================================\n");
    printf("       SISTEMA DE CALCULO DE IMC    \n");
    printf("====================================\n");
    printf("Este programa calcula seu Indice de Massa Corporal (IMC).\n");
    printf("Informe seu peso e sua altura para conhecer seu resultado.\n");
    printf("Ola! Seja bem-vindo(a) ao nosso sistema!\n");

    do {
        printf("\n===== MENU PRINCIPAL =====\n");
        printf("1 - Calcular IMC\n");
        printf("2 - Consultar classificacao do IMC\n");
        printf("0 - Encerrar programa\n");
        printf("Escolha uma opcao: ");

        if (scanf("%d", &opcao) != 1) {
            printf("\nEntrada invalida! Digite um numero.\n");

            int caractere;
            while ((caractere = getchar()) != '\n' &&
                   caractere != EOF) {
            }

            opcao = -1;
            continue;
        }

        switch (opcao) {
            case 1:
                printf("\nDigite seu peso em kg (ex.: 65.5): ");

                if (scanf("%f", &peso) != 1) {
                    printf("Entrada invalida! Digite um peso numerico.\n");

                    int caractere;
                    while ((caractere = getchar()) != '\n' &&
                           caractere != EOF) {
                    }
                    break;
                }

                printf("Digite sua altura em metros (ex.: 1.65): ");

                if (scanf("%f", &altura) != 1) {
                    printf("Entrada invalida! Digite uma altura numerica.\n");

                    int caractere;
                    while ((caractere = getchar()) != '\n' &&
                           caractere != EOF) {
                    }
                    break;
                }

                if (peso <= 0 || altura <= 0) {
                    printf("Erro! Peso e altura devem ser maiores que zero.\n");
                    break;
                }

                imc = peso / (altura * altura);

                printf("\n===== RESULTADO DO IMC =====\n");
                printf("Peso: %.2f kg\n", peso);
                printf("Altura: %.2f m\n", altura);
                printf("Seu IMC e: %.2f\n", imc);

                if (imc < 18.5) {
                    printf("Classificacao: Magreza\n");
                } else if (imc < 25.0) {
                    printf("Classificacao: Normal\n");
                } else if (imc < 30.0) {
                    printf("Classificacao: Sobrepeso\n");
                } else {
                    printf("Classificacao: Obesidade\n");
                }

                break;

            case 2:
                printf("\n===== CLASSIFICACAO DO IMC =====\n");
                printf("Abaixo de 18.5: Magreza\n");
                printf("De 18.5 ate menos de 25: Normal\n");
                printf("De 25 ate menos de 30: Sobrepeso\n");
                printf("30 ou mais: Obesidade\n");
                printf("Classificacao de referencia para adultos.\n");
                break;

            case 0:
                printf("\nPrograma encerrado voluntariamente.\n");
                break;

            default:
                printf("\nOpcao invalida! Escolha 1, 2 ou 0.\n");
                break;
        }

    } while (opcao != 0);

    printf("\nObrigado por utilizar o Sistema de Calculo de IMC!\n");
    printf("Ate a proxima!\n");

    return 0;
}
```